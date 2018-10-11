import React, {Placeholder, PureComponent} from 'react';
import {unstable_scheduleCallback} from 'scheduler';
import {
  unstable_trace as trace,
  unstable_wrap as wrap,
} from 'scheduler/tracing';
import Spinner from './Spinner';
import ContributorListPage from './ContributorListPage';
import UserPage from './UserPage';

export default class App extends PureComponent {
  state = {
    currentId: null,
    showDetail: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.showDetail !== this.state.showDetail ||
      (prevState.currentId !== this.state.currentId && this.state.showDetail)
    ) {
      window.scrollTo(0, 0);
    }
  }

  handleUserClick = id => {
    trace(`View ${id}`, performance.now(), () => {
      trace(`View ${id} (high-pri)`, performance.now(), () =>
        this.setState({
          currentId: id,
        })
      );
      unstable_scheduleCallback(
        wrap(() =>
          trace(`View ${id} (low-pri)`, performance.now(), () =>
            this.setState({
              showDetail: true,
            })
          )
        )
      );
    });
  };

  handleBackClick = () =>
    trace('View list', performance.now(), () =>
      this.setState({
        currentId: null,
        showDetail: false,
      })
    );

  render() {
    const {currentId, showDetail} = this.state;
    return this.renderDetail('sebmarkbage');
    // return showDetail
    //   ? this.renderDetail(currentId)
    //   : this.renderList(currentId);
  }

  renderDetail(id) {
    return (
      <div>
        <button
          onClick={this.handleBackClick}
          style={{
            display: 'block',
            marginBottom: '1rem',
          }}>
          Return to list
        </button>
        <UserPage id={id}/>
      </div>
    );
  }

  renderList(loadingId) {
    return (
      // <Placeholder delayMs={1500} fallback={<Spinner size="large" />}>
        <ContributorListPage
          loadingId={loadingId}
          onUserClick={this.handleUserClick}
        />
      // </Placeholder>
    );
  }
}
