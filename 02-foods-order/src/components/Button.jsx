export default function Button({children, cssType, addStyle, ...props}) {
  let cssClasses = "py-[0.5rem] px-[1.5rem] text-[#1f1a09]";
  if (cssType === 'text') {
    cssClasses += " bg-transparent border-none hover:text-[#ffab04]";
  } else {
    cssClasses += " bg-[#ffc404] border border-[#ffc404] rounded-[4px] hover:bg-[#ffab04] hover:border-[#ffab04]";
  }
  if (addStyle) {
    cssClasses += addStyle;
  }
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  )
}