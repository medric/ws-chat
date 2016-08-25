import React, { PropTypes, Component } from 'react';

class RoomList extends Component {
	constructor(props) {
	   super(props);
	}

	state = {
		room: ''
	};

	componentWillMount() {
	}

	componentDidMount() {
		console.log(this.state);
	}

	componentWillUnmount() {
	}

  componentWillUpdate () {
  }

  render() {
      return (
          <div className="page__container-content row">
              <ul>
              {
                  this.props.rooms.map(room => {
                    return <li> { room.name } </li>
                  }, this)
              }
              </ul>
              <div>
                  <input type="text" value={ this.state.room }
										onChange={(event) => {
											this.setState({room: event.target.value});
										}}
									/>
                  <button
									onClick={() => {
										this.props.addRoom(event, this.state.room)
									}}>
										Add room
                  </button>
              </div>
          </div>
      );
  }
}

RoomList.propTypes = {
	rooms: PropTypes.array,
	addRoom: PropTypes.func,
};

RoomList.defaultProps = {
  rooms: [],
};

export default RoomList;
