import { useCallback, useEffect, useState } from "react";

import InputMoney from "@/components/InputMoney"
import InputText from "@/components/InputText"
import ComboBox from "@/components/comboboxes/Combobox"
import alphavantage, { GlobalQuoteResponse, IntradayResponse, Search } from "@/lib/alphavantage"
import { LinePlot } from "@/components/charts/LinePlot";

async function getData(symbol: string) {

  try {
    const data = await alphavantage.data.intraday(symbol);

    const labels: string[] = [];
    const close: number[] = [];

    const ohlc = [],
      volume = [],
      dataLength = data['Time Series (1min)']

    for (const time in dataLength) {
      const stock_info = dataLength[time];
      ohlc.push([
        time,
        parseFloat(stock_info["1. open"]),
        parseFloat(stock_info["2. high"]),
        parseFloat(stock_info["3. low"]),
        parseFloat(stock_info["4. close"])

      ])
      const date = new Date(time);

      labels.push(date.toTimeString().split(" ")[0]);
      close.push(parseFloat(stock_info["4. close"]))

      volume.push([
        time, // the date                   
        Number(stock_info["5. volume"]) // the volume
      ]);
    }

    return [[data, labels.reverse(), close.reverse()], null]
  } catch (err: any) {
    return [null, err]
  }

}


export default function StockCalculator() {

  const [selectOptions, setSelectOptions] = useState<Search[]>([]);

  const [stock, setStock] = useState<Search>();
  const [query, setQuery] = useState("");

  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [quote, setQuote] = useState<GlobalQuoteResponse>();

  const [broughtFor, setBroughtFor] = useState(0);
  const [stocksBuyed, setStocksBuyed] = useState(0);


  useEffect(() => {

    if (query) {
      alphavantage.data.search(query).then((data: any) => {
        if (data.bestMatches) {
          setSelectOptions(data.bestMatches);
        }
      });
    }

  }, [query])

  const getLabelsData = useCallback(async () => {

    if (stock) {
      const [result, err] = await getData(stock['1. symbol'])
      if (err) {
      } else {
        setLabels(result ? result[1] : []);
        setData(result ? result[2] : []);
      }
    }
  }, [stock, setLabels, setData])

  useEffect(() => {
    if (stock) {
      alphavantage.data.quote(stock['1. symbol'])
        .then((data: any) => {
          setQuote(data);
        });
      getLabelsData();
    }

  }, [stock, getLabelsData])


  return (
    <div className="relative pt-16 pb-2 px-2 sm:px-6 lg:pt-24 lg:pb-5 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left">
          <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl"> Stock calculator</h2>
        </div>

        <div className="mt-5 space-y-5">


          <ComboBox<Search>
            options={selectOptions}
            selected={stock}
            setSelected={setStock}
            setQuery={setQuery}
            placeholder="Find a stock"
          />

          <div>
            {data && labels && <LinePlot data={data} labels={labels} />}
          </div>

          <InputMoney
            label='Current stock price'
            value={parseFloat(quote ? quote?.['Global Quote']['05. price'] : '0')}
            readOnly
          />

          <InputMoney
            label='Brought for'
            value={broughtFor}
            setValue={(value: string) => { setBroughtFor(parseInt(value)) }}
          />

          <InputText
            label='How many stocks did you buy?'
            value={stocksBuyed}
            setValue={(value: string) => { setStocksBuyed(parseInt(value)) }}
          />

          <p className='text-lg font-bold'> Result </p>

          <InputText
            label='You need to buy'
            value={parseFloat((((stocksBuyed * broughtFor) / parseFloat(quote ? quote?.['Global Quote']['05. price'] : '0')) - stocksBuyed).toFixed(2))}
            setValue={(value: string) => { setStocksBuyed(parseInt(value)) }}
          />
        </div>


      </div>
    </div>
  )
}
