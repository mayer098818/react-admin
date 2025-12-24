import { Link } from "react-router-dom";

type Props = { pageTitle: string };
export default function PgaeBreadCrum({ pageTitle }: Props) {
  return (
    <div className="flex justify-between flex-wrap items-center gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
      <nav>
        <ol className="flex justify-between items-center">
          <li>
            <Link to="/" className="flex justify-around items-center">
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>{pageTitle}</li>
        </ol>
      </nav>
    </div>
  );
}
