import * as React from "react";
import styles from "./HomePage.module.scss";
import { IHomePageProps } from "./IHomePageProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as moment from "moment";
import * as $ from "jquery";
require("../assets/style.css");
export interface IHomePageState {
  quickLinks: any;
  resourcesFiles: any;
  searchArray: any;
  searchText: any;
  faqData: any;
  UpcomingEvents: any;
  allUsers: any;
  validationMessage: boolean;
  storeUserCelebrationData: any;
  AllUsers: any;
  showErrorMessage: {
    state: boolean;
    text: string;
  };
  isLoading: boolean;
}
export default class LandingPage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps, state: IHomePageState) {
    super(props);
    this.state = {
      quickLinks: [],
      resourcesFiles: [],
      searchArray: [],
      searchText: "",
      faqData: [],
      UpcomingEvents: [],
      allUsers: [],
      validationMessage: false,
      storeUserCelebrationData: [],
      AllUsers: [],
      showErrorMessage: {
        state: false,
        text: "",
      },
      isLoading: false,
    };
  }
  private getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }
  public render(): React.ReactElement<IHomePageProps> {
    const { description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = this.props;
    const ImageLink = this.props.HomeBannerFilePicker == undefined ? require("../assets/bg.png") : this.props.HomeBannerFilePicker.fileAbsoluteUrl;

    return (
      <section style={{ backgroundColor: "#f9f9f9" }}>
        <div
          className="hero"
          style={{
            backgroundImage: `url(${ImageLink})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="overlay"></div>
          <div className="hero-content">
            <div className="logo">
              {/* <div className="circle">H</div> */}
              <h1>{this.props.Title}</h1>
            </div>
            <p>
              {this.getGreeting()}, {this.props.userDisplayName.split(" ")[0]}! 👋
            </p>

            <input
              type="text"
              id="chatSearchbtn"
              placeholder="Search pages, templates, people..."
              onChange={(e) => {
                this.triggerEventChatSearch();
              }}
            />
          </div>
        </div>
        <div className="container">
          <div className="cards quicklinks">
            {this.state.quickLinks.length > 0 &&
              this.state.quickLinks.map((ele, ind) => {
                let imageURL = ele.AttachmentFiles.length > 0 ? ele.AttachmentFiles[0].ServerRelativeUrl : ele.Icon ? JSON.parse(ele.Icon).serverRelativeUrl : require("../assets/calendar.png");
                return (
                  <a href={ele.Link ? ele.Link.Url : "#"} className="card">
                    <div className="icon green">
                      {" "}
                      <img src={imageURL} />{" "}
                    </div>
                    <p>{ele.Title}</p>
                  </a>
                );
              })}
            {/* <div className="card">
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
            </div> */}
          </div>
          <br />
          <br />
          <div className="wrapper">
            <div className="left">
              <div className="card">
                <h3>Documents</h3>

                <input
                  className="search"
                  value={this.state.searchText}
                  onChange={(event) => {
                    this.searchUsers(event.target["value"]);
                  }}
                  placeholder="Search Forms & Templates..."
                />

                <div className="doc-grid">
                  {this.state.resourcesFiles.length > 0 &&
                    this.state.resourcesFiles.map((file, ind) => {
                      return (
                        <a href={file.Url} style={{ textDecoration: "none", color: "black" }} target="_blank" data-interception="off" className="doc-item">
                          {file.Name}
                        </a>
                      );
                    })}
                  {/* <div className="doc-item">📄 Request Forms</div>
                  <div className="doc-item">📁 Applications</div>
                  <div className="doc-item">📦 Templates</div>
                  <div className="doc-item">📂 Projects</div>
                  <div className="doc-item">📘 Employee Handbook</div>
                  <div className="doc-item">🛡 Policies & Procedures</div>
                  <div className="doc-item">📢 Marketing Collateral</div>
                  <div className="doc-item">📑 SOPs</div> */}
                </div>
              </div>
              <br />
              <br />
              {/* <div className="card">
                <div className="header">
                  <h3>Staff Directory</h3>
                </div>
                <input className="search" placeholder="Search People in organization..." />

                <div className="filters">
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
              </div> */}
              <div className="card">
                <section id="FAQ">
                  <h2 className="CustomHeader" style={{ color: "#8b1e2d" }}>
                    FAQ's
                  </h2>

                  <Accordion preExpanded={["a"]}>
                    {this.state.faqData.length > 0 &&
                      this.state.faqData.map((item, j) => (
                        <AccordionItem uuid={j == 0 ? "a" : `item-${j}`}>
                          <AccordionItemHeading>
                            <AccordionItemButton>{j + 1 + ". " + item.Title}</AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <p>{item.Answer}</p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </section>
              </div>
            </div>

            <div className="right">
              <div className="card">
                <div className="header">
                  <h3>Calendar</h3>
                  {/* <button className="link-btn">Google Calendar ↗</button> */}
                </div>

                <Calendar
                  className="calendar-section"
                  calendarType="US"
                  activeMonth={new Date()}
                  locale="en"
                  onClickDay={(e) => {
                    this.getTodaysEvent(e);
                  }}
                />

                <div className="events">
                  {this.state.UpcomingEvents.length > 0 &&
                    this.state.UpcomingEvents.map((ele, ind) => {
                      return (
                        <div className="event">
                          <div className="date">{ele.EventDateMonthDay}</div>
                          <div>
                            <strong>{ele.Title}</strong>
                            <p>
                              {" "}
                              {this.changeTimeZone(ele.startDate1)} - {this.changeTimeZone(ele.endDate1)}
                            </p>
                          </div>
                          <button className="primary">{ele.Category}</button>
                        </div>
                      );
                    })}
                  {/* <div className="event">
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
                  </div> */}
                </div>
              </div>
              <br />
              <br />
              <div className="card">
                <h3>Celebrations 🎉</h3>
                {this.state.storeUserCelebrationData.length > 0 ? (
                  <>
                    {this.state.storeUserCelebrationData.map((key, val) => {
                      if (key.isBirthday == true) {
                        return (
                          <div className="celebration">
                            <img src={key.profilePhoto} />
                            <div>
                              <strong>{key.displayName}</strong>
                              <p>Birthday</p>
                            </div>
                            <span>{key.displayDate}</span>
                          </div>
                        );
                      } else if (key.isBirthday == false) {
                        return (
                          <div className="celebration">
                            <img src={key.profilePhoto} />
                            <div>
                              <strong>{key.displayName}</strong>
                              <p>
                                Work Anniversary • {key.totalHireYear + "" + key.totalHireYearEnd + " "}
                                Anniversary
                              </p>
                            </div>
                            <span>{key.displayDate}</span>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  this.state.showErrorMessage.state && (
                    <>
                      <div className="row de-msg" id="NoCelebration">
                        {this.state.showErrorMessage.text}
                      </div>
                    </>
                  )
                )}

                {/* <div className="celebration">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>
    );
  }

  public componentDidMount = async () => {
    await this.getQuickLinksDetails();
    await this.getResourcesFiles();
    await this.getFaqsData();
    await this.getTodaysEvent(new Date());
    await this.getcelebrationData();
  };

  // function to trigger event on enter key for Chat Search
  public triggerEventChatSearch = () => {
    let mythis = this;
    var input = document.getElementById("chatSearchbtn");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        window.open(mythis.props.siteUrl + "/_layouts/15/search.aspx/siteall?q=" + event.currentTarget["value"]);
      }
    });
  };

  private getQuickLinksDetails = async () => {
    try {
      const QuickLinksDetails = await sp.web.lists.getByTitle("Quick Links").items.select("Title,Link,Icon,ID,OrderBy").expand("AttachmentFiles").orderBy("OrderBy", true).top(4999).get();

      if (QuickLinksDetails.length > 0) {
        this.setState({ quickLinks: QuickLinksDetails });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get department files from Department Files sharepoint Document Library
  private getResourcesFiles = async () => {
    try {
      // const originalString = this.props.selectedItemId ? this.props.selectedItemId.title : "";
      // const result = originalString.replace(/&/g, '');

      const folderServerRelativeUrl = `${this.props.serverrelativeUrl}/Resources Document`;

      // Get folders
      const folders = await sp.web.getFolderByServerRelativePath(folderServerRelativeUrl).folders.select("Name", "ServerRelativeUrl")();

      // Get files
      const files = await sp.web.getFolderByServerRelativePath(folderServerRelativeUrl).files.select("Name", "ServerRelativeUrl", "TimeCreated", "TimeLastModified", "Author/Title").expand("Author")();

      // Filter out default/system folders
      const defaultFolders = ["Forms", "SiteAssets", "Style Library"];
      const customFolders = folders.filter((folder) => !defaultFolders.includes(folder.Name));

      // Map custom folders
      const folderItems = customFolders.map((folder) => ({
        Type: "Folder",
        Name: folder.Name,
        Url: folder.ServerRelativeUrl,
        Modified: null,
      }));

      // Map file items
      const fileItems = await Promise.all(
        files.map(async (file) => {
          let linkUrl = "";
          let linkName = file.Name; // default to filename

          if (file.Name.endsWith(".url")) {
            try {
              // Get the raw text content of the .url file
              const fileContent = await sp.web.getFileByServerRelativePath(file.ServerRelativeUrl).getText();

              // Extract URL from content (format: [InternetShortcut]\nURL=https://example.com)
              const match = fileContent.match(/URL=(.*)/);
              linkUrl = match ? match[1].trim() : file.ServerRelativeUrl;

              // Extract Name (custom name if available)
              const nameMatch = fileContent.match(/Name=(.*)/);
              linkName = nameMatch ? nameMatch[1].trim() : file.Name;
            } catch (err) {
              console.error("Failed to fetch link content:", err);
              linkUrl = file.ServerRelativeUrl;
            }
          }

          return {
            Type: file.Name.endsWith(".url") ? "Link" : "File",
            Name: file.Name.endsWith(".url") ? linkName.split(".")[0] : file.Name,
            Url: file.Name.endsWith(".url") ? linkUrl : file.ServerRelativeUrl + "?web=1",
            Created: file.TimeCreated,
            Modified: file.TimeLastModified,
          };
        })
      );

      // Combine and sort
      const allItems = [...folderItems, ...fileItems];
      const sortedItems = allItems.sort((a, b) => a.Name.toLowerCase().localeCompare(b.Name.toLowerCase()));

      // Set to state
      this.setState({ resourcesFiles: sortedItems, searchArray: sortedItems });
    } catch (error) {
      console.error("Error fetching document library contents:", error);
    }
  };

  // function to search users
  public searchUsers = (text) => {
    this.setState({ searchText: text });
    let SearchUser = this.state.searchArray.filter((value) => {
      let val = value.Name.toLowerCase();
      if (val.includes(text.toLowerCase())) {
        return value;
      }
    });
    this.setState({ resourcesFiles: SearchUser });
  };

  public getFaqsData = async () => {
    try {
      const faqsDetails = await sp.web.lists.getByTitle("FAQs").items.select("Title,Answer,ID").top(5).get();

      if (faqsDetails.length > 0) {
        this.setState({ faqData: faqsDetails });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public async getTodaysEvent(date) {
    var data = await sp.web.lists.getByTitle("Events").items.select("*,FieldValuesAsText/EventDate,FieldValuesAsText/EndDate").expand("FieldValuesAsText").top(4999).get();

    data.sort((a, b) => {
      return new Date(a.EventDate).valueOf() - new Date(b.EventDate).valueOf();
    });

    data = this.checkToday(data, date);

    var dates = [];
    data.forEach((element, index) => {
      if (index <= 8) {
        dates.push({
          Title: element.Title,
          Category: element.Category ? element.Category : "",
          EventDateDay: element.EventDate ? moment(element.FieldValuesAsText.EventDate).date() : "",
          EventDateMonth: element.EventDate ? moment(element.EventDate).format("MMMM") : "",
          EventDateMonthDay: element.EventDate ? moment(element.FieldValuesAsText.EventDate).format("MMM DD").toUpperCase() : "",
          EventDate: element.EventDate ? moment(element.EventDate).format("DD MMMM YYYY") : "",
          EndDateDay: element.EndDate ? moment(element.FieldValuesAsText.EndDate).date() : "",
          EndDate: element.FieldValuesAsText.EndDate,
          Description: element.Description,
          url: this.props.siteUrl + "/Lists/Events/DispForm.aspx?ID=" + element.ID,
          ID: element.ID,
          ItemType: element.ItemType,
          startDate1: moment(element["FieldValuesAsText"].EventDate).format("YYYY-MM-DD") + "T" + moment(element["FieldValuesAsText"].EventDate).format("HH:mm:ss"),
          endDate1: moment(element["FieldValuesAsText"].EndDate).format("YYYY-MM-DD") + "T" + moment(element["FieldValuesAsText"].EndDate).format("HH:mm:ss"),
        });
      }
    });

    // this.setState({ UpcomingEvents: [] });
    this.setState({ UpcomingEvents: dates });
  }

  public checkToday(arr, date) {
    var temp = [];
    arr.forEach((values) => {
      let output = values.EventDate.split("T")[0];
      let today = moment(date).format("YYYY-MM-DD");
      if (output == today) {
        temp.push(values);
      }
    });
    return temp;
  }

  /** Function to change timezone of display date */
  public changeTimeZone(date) {
    let hours = date.split("T")[1].split(":")[0];
    let minutes = date.split("T")[1].split(":")[1];
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;

    return strTime;
  }

  public getcelebrationData = async () => {
    let storeListData = [];
    await sp.web.lists
      .getByTitle("Celebrations")
      .items.select("*,Title,ID,Name/Title,Name/ID,Name/EMail,FieldValuesAsText/BirthDate,FieldValuesAsText/HireDate,EMail")
      .expand("Name,FieldValuesAsText")
      .top(4999)
      .getAll()
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          data.forEach((ele) => {
            storeListData.push({
              displayName: ele.Name ? ele.Name.Title : "",
              birthDate: ele.BirthDate ? moment(ele["FieldValuesAsText"].BirthDate).format("MM-DD") : null,
              hireDate: ele.HireDate ? moment(ele["FieldValuesAsText"].HireDate).format("YYYY-MM-DD") : null,
              mail: ele.Name ? ele.Name.EMail : ele.EMail,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ AllUsers: storeListData }, () => {
      this.BindUserArray();
    });
  };

  public BindUserArray() {
    let storeUserData = [];

    if (this.state.AllUsers) {
      this.state.AllUsers.map((element: any) => {
        let imageUrl = "/_layouts/15/userphoto.aspx?size=L&username=" + element.mail;
        storeUserData.push({
          displayName: element.displayName,
          hireDate: element.hireDate,
          birthDate: element.birthDate,
          email: element.mail,
          profilePhoto: imageUrl,
        });
      });
    }
    this.GetUpcomingCelebrationsData(storeUserData);
  }

  //#region
  // function to store celebrations data
  private GetUpcomingCelebrationsData = (storeUserData) => {
    let storeUserCelebrationData = [];
    let tempBirthArray = [];
    let tempHireArray = [];
    let todayDate = new Date();
    let todayFormattedDate = moment(todayDate).format("YYYY/MM/DD");
    // let dateAddSevenDays = new Date(todayDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    // let dateFormattedAddSevenDays = moment(dateAddSevenDays).format(`YYYY/MM/DD`);

    // Calculate date range for past 15 days and next 45 days
    let pastDate = new Date(todayDate.getTime() - 15 * 24 * 60 * 60 * 1000);
    let futureDate = new Date(todayDate.getTime() + 45 * 24 * 60 * 60 * 1000);

    let pastDateFormatted = moment(pastDate).format("YYYY/MM/DD");
    let futureDateFormatted = moment(futureDate).format("YYYY/MM/DD");

    if (storeUserData.length > 0) {
      $.each(storeUserData, (e, element) => {
        if (element.birthDate != null) {
          tempBirthArray.push({
            displayName: element.displayName,
            birthDate: element.birthDate,
          });
          let birthDateFormatted;
          let birthDate = element.birthDate; //MM-DD format
          let birthDateSplit = element.birthDate.split("-");
          let birthDateMonth = birthDateSplit[0];
          let birthDateDay = birthDateSplit[1];
          let birthDateDisplay = moment(birthDateMonth).format("MMM").toUpperCase() + " " + birthDateDay;

          if (birthDateMonth == 1 && todayDate.getMonth() + 1 == 12) {
            birthDateFormatted = todayDate.getFullYear() + 1 + "/" + birthDateMonth + "/" + birthDateDay;
          } else {
            birthDateFormatted = todayDate.getFullYear() + "/" + birthDateMonth + "/" + birthDateDay;
          }
          // if (new Date(birthDateFormatted) <= new Date(dateFormattedAddSevenDays) && new Date(todayFormattedDate) <= new Date(birthDateFormatted)) {

          if (new Date(birthDateFormatted) >= new Date(pastDateFormatted) && new Date(birthDateFormatted) <= new Date(futureDateFormatted)) {
            storeUserCelebrationData.push({
              displayName: element.displayName,
              displayDate: birthDateDisplay,
              email: element.email,
              // "delveUrl":element.delveUrl,
              profilePhoto: element.profilePhoto,
              totalHireYear: 0,
              isBirthday: true,
              totalHireYearEnd: "",
            });
          }
        }
        if (element.hireDate != null) {
          tempHireArray.push({
            displayName: element.displayName,
            hireDate: element.hireDate,
          });
          let hireDateFormatted;
          let hireDate = element.hireDate; //YYYY-MM-DD format
          let hireDateSplit = element.hireDate.split("-");
          let hireDateYear = hireDateSplit[0];
          let hireDateMonth = hireDateSplit[1];
          let hireDateDay = hireDateSplit[2];
          // let hireDateDisplay = new Date(hireDateMonth).toLocaleString('default', { month: 'short' }).toUpperCase() + " " + hireDateDay;
          let hireDateDisplay = moment(hireDateMonth).format("MMM").toUpperCase() + " " + hireDateDay;

          let totalHireYear;
          if (hireDateMonth == 1 && todayDate.getMonth() + 1 == 12) {
            hireDateFormatted = todayDate.getFullYear() + 1 + "/" + hireDateMonth + "/" + hireDateDay;
            totalHireYear = todayDate.getFullYear() + 1 - hireDateYear;
          } else {
            hireDateFormatted = todayDate.getFullYear() + "/" + hireDateMonth + "/" + hireDateDay;
            totalHireYear = todayDate.getFullYear() - hireDateYear;
          }
          if (totalHireYear > 0) {
            let suffixAfterTotalHireYear;
            let modTen = totalHireYear % 10;
            let modHundred = totalHireYear % 100;
            if (modTen == 1 && modHundred != 11) {
              suffixAfterTotalHireYear = "st";
            } else if (modTen == 2 && modHundred != 12) {
              suffixAfterTotalHireYear = "nd";
            } else if (modTen == 3 && modHundred != 13) {
              suffixAfterTotalHireYear = "rd";
            } else {
              suffixAfterTotalHireYear = "th";
            }

            if (new Date(hireDateFormatted) >= new Date(pastDateFormatted) && new Date(hireDateFormatted) <= new Date(futureDateFormatted)) {
              storeUserCelebrationData.push({
                displayName: element.displayName,
                displayDate: hireDateDisplay,
                email: element.email,
                // "delveUrl":element.delveUrl,
                profilePhoto: element.profilePhoto,
                totalHireYear: totalHireYear,
                isBirthday: false,
                totalHireYearEnd: suffixAfterTotalHireYear,
              });
            }
          }
        }
      });
    }

    let sortedUserCelebrationData = storeUserCelebrationData.length > 0 ? storeUserCelebrationData.sort(this.SortDate) : storeUserCelebrationData;

    this.setState({
      storeUserCelebrationData: sortedUserCelebrationData,
      showErrorMessage: {
        state: sortedUserCelebrationData.length <= 0 ? true : false,
        text: "No Upcoming Birthday or Anniversary to Celebrate",
      },
      isLoading: false,
    });
    console.log("🚀 ~ sortedUserCelebrationData:", sortedUserCelebrationData.length);
  };
  //#endregion

  //#region
  //function for sort date
  private SortDate = (a, b) => {
    if (a.displayDate != null && b.displayDate != null) {
      let dateA = new Date(new Date(a.displayDate).getMonth() + 1 + "/" + new Date(a.displayDate).getDate() + "/" + new Date().getFullYear());
      let dateB = new Date(new Date(b.displayDate).getMonth() + 1 + "/" + new Date(b.displayDate).getDate() + "/" + new Date().getFullYear());
      return dateA > dateB ? 1 : -1;
    }
  };
  //#endregion
}
