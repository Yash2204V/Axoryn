import Logo from '../Logo'

function Footer() {
  
  return (
    <footer className="px-4 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between border-t py-2">
        <div className="mr-4 w-12 shrink-0 sm:w-16">
          <Logo />
        </div>
        <p className="text-sm text-white">©{new Date().getFullYear()} Axoryn. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer