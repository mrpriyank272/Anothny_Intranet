import * as React from "react";
import styles from "./HomePage.module.scss";
import { IHomePageProps } from "./IHomePageProps";
import { escape } from "@microsoft/sp-lodash-subset";

require("../assets/style.css");

export default class LandingPage extends React.Component<IHomePageProps, {}> {
  public render(): React.ReactElement<IHomePageProps> {
    const { description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = this.props;

    return (
      <section style={{ backgroundColor: "#f9f9f9" }}>
        <div className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <div className="logo">
              {/* <div className="circle">H</div> */}
              <h1>Westways Insurance Hub</h1>
            </div>
            <p>Good morning, Sabina! 👋</p>

            <input type="text" placeholder="Search pages, templates, people..." />
          </div>
        </div>
        <div className="container">
          <div className="cards quicklinks">
            <div className="card">
              <div className="icon green">
                {" "}
                <img src={require("../assets/calendar.png")} />{" "}
              </div>
              <p>Time Sheets</p>
            </div>

            <div className="card">
              <div className="icon red">
                <img src={require("../assets/calendar1.png")} />
              </div>
              <p>Time Off</p>
            </div>

            <div className="card">
              <div className="icon orange">
                <img src={require("../assets/poor.png")} />
              </div>
              <p>Expenses</p>
            </div>

            <div className="card">
              <div className="icon light-green">
                <img src={require("../assets/holidays.png")} />
              </div>
              <p>Holidays</p>
            </div>

            <div className="card">
              <div className="icon purple">
                <img src={require("../assets/benefits.png")} />
              </div>
              <p>Benefits</p>
            </div>

            <div className="card">
              <div className="icon blue">
                <img src={require("../assets/directory.png")} />
              </div>
              <p>Directory</p>
            </div>

            <div className="card">
              <div className="icon pink">
                <img src={require("../assets/itsupport.png")} />
              </div>
              <p>IT Helpdesk</p>
            </div>

            {/* <div className="card">
              <div className="icon dark-green"><img src={require('../assets/calendar.png')} /></div>
              <p>Products</p>
            </div> */}
          </div>
          <br />
          <br />
          <div className="wrapper">
            <div className="left">
              <div className="card">
                <h3>Documents</h3>

                <input className="search" placeholder="Search Forms & Templates..." />

                <div className="doc-grid">
                  <div className="doc-item">📄 Request Forms</div>
                  <div className="doc-item">📁 Applications</div>
                  <div className="doc-item">📦 Templates</div>
                  <div className="doc-item">📂 Projects</div>
                  <div className="doc-item">📘 Employee Handbook</div>
                  <div className="doc-item">🛡 Policies & Procedures</div>
                  <div className="doc-item">📢 Marketing Collateral</div>
                  <div className="doc-item">📑 SOPs</div>
                </div>
              </div>
              <br />
              <br />
              <div className="card">
                <div className="header">
                  <h3>Staff Directory</h3>
                  {/* <span className="badge">5 people</span> */}
                </div>
                <input className="search" placeholder="Search People in organization..." />

                <div className="filters">
                  {/* <input className="search" placeholder="Search people..."/>
        <select><option>Location</option></select>
        <select><option>Department</option></select> */}
                </div>

                <div className="staff-list">
                  <div className="staff">
                    <img src="https://i.pravatar.cc/40?img=1" />
                    <div>
                      <strong>Andres Clark</strong>
                      <p>Chief Executive</p>
                    </div>
                  </div>

                  <div className="staff">
                    <img src="https://i.pravatar.cc/40?img=2" />
                    <div>
                      <strong>Andrew Calston</strong>
                      <p>IT Specialist</p>
                    </div>
                  </div>

                  <div className="staff">
                    <img src="https://i.pravatar.cc/40?img=3" />
                    <div>
                      <strong>Emily Hunt</strong>
                      <p>Support Engineer</p>
                    </div>
                  </div>

                  <div className="staff">
                    <img src="https://i.pravatar.cc/40?img=4" />
                    <div>
                      <strong>Luis Ponce</strong>
                      <p>Claims Adjuster</p>
                    </div>
                  </div>

                  <div className="staff">
                    <img src="https://i.pravatar.cc/40?img=5" />
                    <div>
                      <strong>Sabina Saetgareeva</strong>
                      <p>Operations Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="card">
                <div className="header">
                  <h3>Calendar</h3>
                  {/* <button className="link-btn">Google Calendar ↗</button> */}
                </div>

                <div className="calendar">
                  <h4>April 2026</h4>
                  <div className="days">
                    <span>SU</span>
                    <span>MO</span>
                    <span>TU</span>
                    <span>WE</span>
                    <span>TH</span>
                    <span>FR</span>
                    <span>SA</span>
                  </div>
                  <div className="dates">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span className="active">15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                    <span>19</span>
                    <span>20</span>
                    <span>21</span>
                    <span>22</span>
                    <span>23</span>
                    <span>24</span>
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                    <span>29</span>
                    <span>30</span>
                  </div>
                </div>

                <div className="events">
                  <div className="event">
                    <div className="date">APR 17</div>
                    <div>
                      <strong>New Hire Orientation</strong>
                      <p>3:00 PM – 4:00 PM</p>
                    </div>
                    <button className="primary">Register</button>
                  </div>

                  <div className="event">
                    <div className="date">APR 23</div>
                    <div>
                      <strong>All Hands Meeting</strong>
                      <p>10:00 AM – 11:30 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="card">
                <h3>Celebrations 🎉</h3>

                <div className="celebration">
                  <img src="https://i.pravatar.cc/40?img=6" />
                  <div>
                    <strong>Sabina Saetgareeva</strong>
                    <p>Work Anniversary • 3 years</p>
                  </div>
                  <span>Nov 30</span>
                </div>

                <div className="celebration">
                  <img src="https://i.pravatar.cc/40?img=7" />
                  <div>
                    <strong>Andrew Calston</strong>
                    <p>Birthday</p>
                  </div>
                  <span>Nov 30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>
    );
  }
}
