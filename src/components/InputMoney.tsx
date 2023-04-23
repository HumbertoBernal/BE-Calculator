
type InputMoneyProps = {
  label?: string,
  placeholder?: string,
  value: number,
  setValue?: (value: string) => void
  readOnly?: boolean
}

export default function InputMoney({ label, placeholder, value, setValue, readOnly }: InputMoneyProps) {

  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-900"
      >
        {label || "Price"}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="number"
        name="name"
        id="name"
        min={0}
        value={value}
        onChange={(event) => {
          if (parseFloat(event.target.value) < 0) {
            setValue && setValue("0")
          } else {
            setValue && setValue(event.target.value)
          }
        }}
        className="block w-full border-0  text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm pl-7 pr-12 rounded-md"
        placeholder={placeholder || "0.00"}
        readOnly={!!readOnly}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm" id="price-currency">
          USD
        </span>
      </div>
    </div>
  )

}
