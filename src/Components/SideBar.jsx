function SideBar({ elements }) {
  return (
    <nav className="sidebar">
      <ul>
        {elements.map((element, index) => (
          <li key={index}>
            <a href={element.link}>{element.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
