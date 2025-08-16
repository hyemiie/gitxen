import Image from "next/image";
import './language.css'

const languages = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
];

export default function Languages() {
  return (
    <div className="container">
      <h1>Compatible Languages & Frameworks</h1>
      <p>Chat with a smart assistant trained to understand your code and <br/>guide you through problems, errors, and best practices.</p>
      <div className="language-grid">
        {languages.map((lang) => (
          <div className="language-card" key={lang.name}>
            <Image src={lang.icon} alt={lang.name} width={24} height={24} />
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
      <div className="btn-div">
                            <button className="lang-btn">Get Started </button>
</div>

    </div>
  );
}
