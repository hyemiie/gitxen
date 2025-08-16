import "./footer.css";

export default function FooterPage() {
  return (
    <div className="footer-page-container">

      <footer>
        © {new Date().getFullYear()} Gitxen. Built using Next.js.
      </footer>
    </div>
  );
}
