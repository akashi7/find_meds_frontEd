import { HomeNav } from '../Component/HomeNav';


export const HomePage = () => {
  return (
    <div className="whole">
      <HomeNav />
      <div className="container">
        <div className="top">
          <div className="services">
            <h2>On top services</h2>
            <br></br>
            <hr></hr>
            <br></br>
            <h4><u>Cars</u></h4>
            <ul>
              <li>Top cars</li>
            </ul>
          </div>
          <div className="houses">
            <h4><u>Houses</u></h4>
            <ul>
              <li>Top Houses</li>
            </ul>
          </div>
        </div>
        <div className="menu">
          <div className="services">
            <h2>All Services</h2>
            <br></br>
            <hr></hr>
            <br></br>
            <h4><u>Cars</u></h4>
            <ul>
              <li>Renting cars</li>
              <li>Buying cars</li>
            </ul>
          </div>
          <div className="houses">
            <h4><u>Houses</u></h4>
            <ul>
              <li>Renting Houses</li>
              <li>Buying Houses</li>
            </ul>
          </div>
          <div className="memo">
            <h4><u>Memorial Services</u></h4>
            <ul>
              <li>Needed Equipments</li>
            </ul>
          </div>
        </div>
        <div className="content">
          <h2>The creatives</h2>
          <br></br>
          <hr></hr>
          <br></br>
          <div className="abt">
            <form>
              <textarea rows="10"
                cols="25" defaultValue="Write for Us"  ></textarea>
              <button type="button" className="Tbutton" >Send</button>
            </form>
            <br></br>
            <ul>
              <h4>About Us</h4>
              <p>Small creatives people in web development eager for new challenges</p>
            </ul>
            <br></br>
            <ul>
              <h4>Contact Us</h4>
              <li>Phone : +250000000</li>
              <li>Email : Email@email.com</li>
            </ul>
            <br></br>
            <ul>
              <h4>Notice !</h4>
              <p>New design and components in work</p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
