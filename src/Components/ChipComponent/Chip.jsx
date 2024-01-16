import "./Chip.css"
import user from "../../Resources/icons8-user-40.png"
import cross from "../../Resources/icons8-cross-15.png"

const Chip = (props) => (
    <span className="chip">
        <img className="im" src={user}></img>
        <span className="nm">{props["val"]}</span>
        {props["hidden"]?<img className = "cross" src={cross} onClick={()=>(props["cross"])(props["val"])}></img>:props["email"]}
    </span>
);

export default Chip;