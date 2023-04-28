import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
	return (
		<Fragment>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<div>logo</div>
				</Link>
				<div className="nav-links-containeer">
					<Link className="nav-link" to="/shop">
						Shop
					</Link>
				</div>
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
