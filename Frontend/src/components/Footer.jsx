import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="w-full bg-[#2b2b2b] py-2">
      <div className="flex flex-row justify-center gap-4">
        <img src={logo} alt="logo" className="w-28" />
        <p className="text-gray-400 text-s flex flex-col justify-center">© 2026 BookMyScreen. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer