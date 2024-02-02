interface Props {
  children: React.ReactNode;
}

const DashboardControls = ({ children }: Props) => {
  return <div className="sidebar">{children}</div>;
};

export default DashboardControls;
