import React, { Component } from "react";
import { repositoryUrl, privacyPolicyUrl } from "../contents/constants";
import moment from "moment";

let timer = null;
class head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    };
  }

  updateGen(lastGen) {
    let info = null;
    if (lastGen) {
      info = moment(lastGen).fromNow();
      timer = setTimeout(
        function() {
          this.updateGen(lastGen);
        }.bind(this),
        30000
      );
    }
    this.setState({ info });
  }

  componentWillReceiveProps(next) {
    if (next.lastGen != this.props.lastGen) {
      if (timer) {
        clearTimeout(timer);
      }
      this.updateGen(next.lastGen);
    }
  }

  componentWillUnmount() {
    if (timer) {
      clearTimeout(timer);
    }
  }

  componentDidMount() {
    const { lastGen } = this.props;
    this.updateGen(lastGen);
  }

  render() {
    let { info } = this.state;
    return (
      <div>
        <div className="content__head">
          <div className="content__head__title">publiccode.yml Pusher</div>
          <div className="content__head__help">
            <div>
              <a className="pr-5" href={privacyPolicyUrl} rel="noopener noreferrer" target="_blank">
                Privacy policy
              </a>
              <a href={repositoryUrl} rel="noopener noreferrer" target="_blank">
                Need help?
              </a>
            </div>
            <div>
              {info && (
                <span className="content__head__status">
                  Last generation: {info}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="content__target-repo">
          <h2>Connected to { this.props.targetRepo }</h2>
          <button onClick={ ev => this.props.handleClick(ev) }>Connect to a different repo</button>
        </div>
      </div>
    );
  }
}

export default head;
