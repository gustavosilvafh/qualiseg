import { forwardRef } from 'react'

import { IMaskInput } from 'react-imask'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

export const TextMaskCustom = (mask: string) =>
  forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={{
          '#': /[1-9]/
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    )
  })
