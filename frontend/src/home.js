// frontend/src/pages/home.js
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <h1>StreetFix</h1>
      <p>
        রাস্তায় গর্ত, ম্যানহোল খোলা, স্ট্রিট লাইট নষ্ট, ড্রেন ব্লক – যেকোনো civic
        problem এখানে report করুন। Authority সমস্যা দেখবে এবং সমাধান হলে status
        <b> Solved</b> করে দেবে, নাহলে <b>Pending</b> ই থাকবে।
      </p>

      <div style={{ marginTop: 20 }}>
        <Link className="btn" to="/submit">
          নতুন Problem Report করুন
        </Link>
        <Link className="btn secondary" to="/issues">
          সব Report দেখুন
        </Link>
      </div>
    </div>
  );
}

export default Home;