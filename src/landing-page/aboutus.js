import LandingPageHeader from './components/LandingPageHeader';
import { APP_NAME } from '../constants';

export default function AboutUs() {
  return (
    <>
      <LandingPageHeader />
      <main>
        <section className="about-us">
          <div>
            <h2>About {APP_NAME}</h2>

            <p>{APP_NAME} helps you keep track of your tasks and to-do list.</p>
            <p>
              With{' '}
              <a href="https://nemo-landing-page.netlify.app/" target="_blank">
                Nemo
              </a>{' '}
              you can mix and match different sounds in order to create your
              perfect sound environment. todoBase helps you stay on top of your
              work routine, tasks and todolist.
            </p>

            <h3>Self-started with passion</h3>
            <p>
              {APP_NAME} started as a side project in 2021. At that time the
              founder, Harshit, was working remotely as software engineer.
              Struggling to maintain daily schedule, Harshit created {APP_NAME}.
              Why not use existing todo app you ask? Well, Harshit doesn't have
              the answer for you. He created todoBase because he could.
            </p>

            <h3>Simplicity and care for people.</h3>
            <p>
              At {APP_NAME} we value simplicity, care for good design and
              details and we put passion in everything we do. We are driven by
              the goal to create the best possible product and to provide our
              users with a service that is not just helping them but which they
              also love to use.
            </p>
            <p>
              We put people at the core of our work, respecting our users and
              treating them with kindness. We’re building {APP_NAME} around
              people and their needs and we believe that products should not
              fight for users’ attention at all times and at any cost. Products
              can be useful and respectful, honest and enjoyable. And we want to
              do exactly that, making our small contribution to make the world a
              better place.
            </p>
            <p>
              If you want to support us, then just help spreading some kindness
              or say hello :)
            </p>

            <p>
              All the Best
              <br />
              Harshit Singhai
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
