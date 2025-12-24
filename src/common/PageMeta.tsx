import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  children: React.ReactNode;
};
const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);
export const AppWrapper: React.FC<Props> = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};
export default PageMeta;
