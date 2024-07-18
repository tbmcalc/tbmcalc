import "./Card.css";
import PropTypes from "prop-types";

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

function Card(props) {
    const classes = "card " + props.className;
    return <div className={classes}>{props.children}</div>;
}

export default Card;