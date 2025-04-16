import { Link } from 'react-router-dom';

export default function CardDashboard({ title, icon, to }) {
  return (
    <Link to={to} className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-md text-white hover:scale-105 transition-all">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
