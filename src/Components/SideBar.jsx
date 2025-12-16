function SideBar({ elements }) {
  return (
    <nav className="bg-navbar-bg justify-between flex items-center">
      <ul>
        <li className="p-4 font-logo text-2xl font-bold text-brand-gray tracking-widest">Logo</li>
      </ul>
      <ul className="flex flex-row p-4 space-x-8 justify-end mr-10">
        {elements.map((element, index) => (
          <li key={index} className=" font-playfair font-black text-[#2E2E3A] hover:underline">
            <a href={element.link}>{element.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
