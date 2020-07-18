import React from "react";
import "./App.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { TextField } from "@material-ui/core";



let nameEdited = "";
let emailEdited = "";
let phoneEdited = "";
let companyEdited = "";
let addressEdited = "";
let addName = "";
let addEmail = '';
let addCompany = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [{
        name: "Mahesh",
        email: "mahesh@gmail.com",
        number: "9098169381",
        company: "Innoventes",
        address: "BTM",
      }],
      selectedName: "Mahesh",
      selectedEmail: "mahesh@gmail.com",
      selectedNumber: "9098169381",
      selectedCompany: "Innoventes",
      selectedAddress: "BTM",
      selectedIndex: Number,
      textBoxShow: false,
      showAddContactTextBox: false,
    };
  }
  onRowSelection = (rows, index) => {
    this.setState({
      selectedIndex: index
    });
    this.setState({
      selectedID: index,
      selectedName: rows.name,
      selectedEmail: rows.email,
      selectedNumber: rows.number,
      selectedCompany: rows.company,
      selectedAddress: rows.address,
    });
  }
  AddContact = () => {
    this.setState({ showAddContactTextBox: true });
  }

  addColumn = () => {
    if (addEmail !== '' && addCompany !== '' && addName !== '') {
      var rows = this.state.rows;
      rows.push({
        name: addName,
        email: addEmail,
        number: "",
        company: addCompany,
        address: "",
      })
      this.setState({
        rows: rows,
        showAddContactTextBox: false
      });
      addName = "";
      addEmail = "";
      addCompany = "";
    }
    else {
      alert("name, email, company should not be empty.")
    }
  }
  editRow = () => {
    this.setState({ textBoxShow: true });
  }

  stopEditing = () => {
    this.setState({
      textBoxShow: false,
    });

    nameEdited = "";
    emailEdited = "";
    phoneEdited = "";
    companyEdited = "";
    addressEdited = "";
  }
  saveEdit = () => {
    let item = (!this.state.rows[this.state.selectedIndex] ? this.state.rows[0] : this.state.rows[this.state.selectedIndex]);
    if (nameEdited !== '' && emailEdited !== "" && phoneEdited !== "") {
      let newName = item.name = nameEdited;
      let newEmail = item.email = emailEdited;
      let newPhone = item.number = phoneEdited;
      let newCompany = item.company = companyEdited;
      let newAddress = item.address = addressEdited;
      this.setState({
        item: newName,
        selectedName: newName,
        item: newEmail,
        selectedEmail: newEmail,
        item: newPhone,
        selectedNumber: newPhone,
        selectedCompany: newCompany,
        item: newCompany,
        selectedAddress: newAddress,
        textBoxShow: false
      });
    }
    else {
      alert("name, phone number, email should not be empty.")
    }
  }
  render() {
    return (
      <div className="outer-div">
        <Grid container>
          <Grid item sm={4}> <PermContactCalendarOutlinedIcon className="contact-icon" />
            <label className="contact-label">Contacts</label>
            <InputLabel>Welcome to CRM   contact page</InputLabel>
          </Grid>
          <Grid item sm={3}><label><span className="sort-by-text">Sort By : </span>Date Created</label></Grid>
          <Grid item sm={6} className="search-grid" >
            <Paper variant="outlined" className="paper-class">
              <InputBase
                className="search-button"
                placeholder="Search contacts"

              />
              <span className="search-icon"><SearchIcon /> </span>
            </Paper>
          </Grid>
          <Grid item sm={3} className="add-contact-button-greed">
            <Button className="add-contact-button" onClick={this.AddContact}> + Add Contact</Button>
          </Grid>
          <Grid item sm={6}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-row-header" >
                    <TableCell align="center">+</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Basic Info</TableCell>
                    <TableCell align="right">Company</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows.map((row, index) => {
                    let avatar = row.name.charAt(0);
                    return (
                      <TableRow key={index} onClick={() => { this.onRowSelection({ name: row.name, email: row.email, number: row.number, company: row.company, address: row.address }, index) }} selected={row.selected}>
                        <TableCell>
                          <Checkbox

                          />
                        </TableCell>
                        <TableCell> <Avatar className="avatar">{avatar}</Avatar></TableCell>
                        <TableCell>
                          {row.name}
                          <InputLabel>{row.email}</InputLabel>
                        </TableCell>
                        <TableCell align="right">{row.company} </TableCell>
                      </TableRow>

                    )
                  })}

                  {
                    this.state.showAddContactTextBox &&
                    <TableRow>
                      <TableCell>
                        <TextField placeholder=" name" onChange={(e) => { addName = e.target.value }}></TextField>
                      </TableCell>
                      <TableCell>
                        <TextField placeholder=" email" onChange={(e) => { addEmail = e.target.value }}></TextField>
                      </TableCell>
                      <TableCell>
                        <TextField placeholder="company" onChange={(e) => { addCompany = e.target.value }}></TextField>
                      </TableCell>
                      <TableCell><CheckIcon onClick={this.addColumn} /> </TableCell>
                      <TableCell>< ClearIcon onClick={() => { this.setState({ showAddContactTextBox: false }); addName = ""; addEmail = ""; addCompany = ""; }} /></TableCell>
                    </TableRow>

                  }


                </TableBody>

              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={6}>

            <div className="outer-div-display-contact">
              <Table>


                <TableHead>
                  <TableRow>

                    <TableCell colSpan={4} align="center"><Avatar className="avatar3" >{this.state.selectedName.charAt(0)}</Avatar>
                      <div>{this.state.selectedName}</div>
                    </TableCell>

                  </TableRow>

                </TableHead>
                <TableBody>

                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      {this.state.textBoxShow && <CheckIcon onClick={this.saveEdit} />}
                    </TableCell>
                    <TableCell>

                      {this.state.textBoxShow && <ClearIcon onClick={this.stopEditing} />}
                    </TableCell>
                    <TableCell>
                      <EditOutlinedIcon onClick={this.editRow} />
                    </TableCell>
                  </TableRow>

                  <TableRow>

                    <TableCell><InputLabel>Full Name </InputLabel ></TableCell>
                    <TableCell align="left">
                      {
                        (this.state.textBoxShow) ?
                          (<TextField style={{ width: "70%" }} placeholder="Enter name" onChange={(e) => nameEdited = e.target.value} defaultValue={this.state.selectedName} />
                          ) : (this.state.selectedName)

                      }
                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><InputLabel>Email </InputLabel></TableCell>
                    <TableCell align="left">
                      {
                        (this.state.textBoxShow) ?
                          (<TextField style={{ width: "70%" }} placeholder="Enter email" onChange={(e) => emailEdited = e.target.value} defaultValue={this.state.selectedEmail} />

                          ) : (this.state.selectedEmail)
                      }
                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><InputLabel>Phone </InputLabel></TableCell>
                    <TableCell align="left">
                      {
                        (this.state.textBoxShow) ?
                          (<TextField defaultValue={this.state.selectedNumber} style={{ width: "70%" }} placeholder="Enter phone number" onChange={(e) => phoneEdited = e.target.value} />
                          ) : (this.state.selectedNumber)
                      }</TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><InputLabel>Company</InputLabel></TableCell>
                    <TableCell align="left">
                      {
                        (this.state.textBoxShow) ?
                          (<TextField defaultValue={this.state.selectedCompany} style={{ width: "70%" }} placeholder="Enter company" onChange={(e) => companyEdited = e.target.value} />
                          ) : (this.state.selectedCompany)
                      }

                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><InputLabel>Address</InputLabel></TableCell>
                    <TableCell align="left">
                      {
                        (this.state.textBoxShow) ?
                          (<TextField defaultValue={this.state.selectedAddress} style={{ width: "70%" }} placeholder="Enter address" onChange={(e) => addressEdited = e.target.value} />
                          ) : (this.state.selectedAddress)
                      }
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Grid>

        </Grid>

      </div>
    );
  }
}

export default App;
