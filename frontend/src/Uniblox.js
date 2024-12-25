import './Uniblox.css';
import unibloxlogo from "./uniblox_io_logo.jpeg";

function Uniblox() {
  return (
    <div className="Uniblox">
      <header className="Uniblox-header">
        <img src={unibloxlogo} className="Uniblox-logo" alt="logo" />
        <p className="Uniblox-title">Uniblox </p>
      </header>
      <div className="Uniblox-searchBar">
        <input type="text" placeholder="Search for a project" />
      </div>
      <div className="Uniblox-topMenu">
        <button className="Uniblox-topMenu-signin">
          Signin
        </button>
        <button className="Uniblox-topMenu-cart">
          Cart
        </button>
      </div>
      <body>
        <div className="Uniblox-body">
          <div className="Uniblox-body-items">
            <div className="Uniblox-body-item">
              <div className="Uniblox-body-item-image">
                

              </div>
              <div className="Uniblox-body-item-text">
                Basketball
              </div>
              <div className="Uniblox-body-item-addItem">
                Add to cart
              </div>

            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Uniblox;
