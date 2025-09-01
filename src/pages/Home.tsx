import CallToAction from '../components/CallToAction';
import DashboardPreviews from '../components/DashboardPreviews';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  return (
    <main>
      <Hero />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="dashboard">
        <DashboardPreviews />
      </section>
      {/* <section id="testimonials">
        <Testimonials />
      </section> */}
      <CallToAction />
    </main>
  );
};

export default Home;