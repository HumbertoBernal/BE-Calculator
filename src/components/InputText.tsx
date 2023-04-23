
type InputTextProps = {
  label?: string,
  placeholder?: string,
  value: number,
  setValue: (value: string) => void
  readOnly?: boolean
}

export default function InputText({ label, placeholder, value, setValue, readOnly }: InputTextProps) {

  return (
    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-900"
      >
        {label || "Price"}
      </label>
      <input
        type="number"
        name="name"
        id="name"
        min={0}
        value={value}
        onChange={(event) => {
          if (parseFloat(event.target.value) < 0) {
            setValue("0")
          } else {
            setValue(event.target.value)
          }
        }}
        className="block w-full border-0  text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm pl-7 pr-12 rounded-md"
        placeholder={placeholder || "0.00"}
        readOnly={!!readOnly}
      />

    </div>
  )

}