interface IButton {
  text: string
  onClick: () => void
  disabled?: boolean
}
const Button = ({ onClick, text, ...attrs }: IButton) => {
  return <button className='button' onClick={onClick} {...attrs}>{text}</button>
}

export default Button
