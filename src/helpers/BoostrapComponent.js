import { PureComponent } from 'react';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function BoostrapComponent(WrappedComponent) {
  class Wrapper extends PureComponent {
    render() {
      return (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <WrappedComponent />
          </div>
        </Container>
      );
    }
  }
  return Wrapper;
}
