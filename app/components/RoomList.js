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
	}

	componentWillUnmount() {
	}

  componentWillUpdate () {
  }

  render() {
      return (
					<div className="row">
						<div className="page__container-content col">
	              <ul id="room-list">
	              {
	                  this.props.rooms.map(room => {
	                    return <li key={ room.name }> { room.name } </li>
	                  }, this)
	              }
	              </ul>
	              <div className="page__container-content__form row">
	                  <input type="text" value={ this.state.room } className="input-x"
											onChange={(event) => {
												this.setState({room: event.target.value});
											}}
										/>
	                  <button className="flg-10"
											onClick={() => {
												this.props.addRoom(event, this.state.room)
											}}>
											Add
	                  </button>
	              </div>
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
