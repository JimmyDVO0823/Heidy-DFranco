function SideBar({ elements }) {
  return (
    <nav className="bg-gray-600 justify-between flex items-center">
      <ul>
        <li className="text-white p-4 font-bold text-lg">Logo</li>
      </ul>
      <ul className="flex flex-row p-4 space-x-2 justify-end mr-10">
        {elements.map((element, index) => (
          <li key={index} className="text-white hover:underline">
            <a href={element.link}>{element.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
