import React from 'react';

const About = () => {
  return (
    <React.Fragment>
      <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m category-intro">
        <h2 className="l-text2 t-center">
          About
        </h2>
      </section>
      <section className="bgwhite p-t-66 p-b-38">
        <div className="container">
          <div className="row">
            <div className="col-md-4 p-b-30">
              <div className="hov-img-zoom">
                <img src="/images/banner-14.jpg" alt="IMG-ABOUT" />
              </div>
            </div>

            <div className="col-md-8 p-b-30">
              <h3 className="m-text26 p-t-15 p-b-16">About Bannershop</h3>

              <p className="p-b-28">
                Banner Shop is your one-stop solution for all your signage and print needs in the Bay Area, including San Francisco, San Jose and Oakland.  From vinyl banner printing, outdoor sign displays to expandable and retractable banner stand, we produce quality media at affordable prices. 
              </p>
              
              <p className="p-b-28">
              Since 1993, Banner Shop of San Francisco has been producing high-quality signage and other print media for Bay Area businesses.  With an in-house design team, digital printing, and installation included with orders, we provide a fast turnaround time for any vinyl banner printing and stands.
              </p>

              <h6 className="p-t-15 p-b-16">Vinyl Banner Printing</h6>
              <p className="p-b-28">
                A full color banner is an effective way to attract attention for your business.  It is an advertising tool that is guaranteed to increase foot traffic and increase top of mind awareness.  At the same time, a poorly printed banner quickly diminishes the outward perception of your business.  At Banner Shop, we provide full color, digital vinyl banner printing that uses high quality materials and fade resistant inks.  Each banner is weather proof, suitable as an indoor or outdoor sign.  We can complete any vinyl banner printing within 1-3 business days.
              </p>

              <h6 className="p-t-15 p-b-16">Outdoor Sign Displays</h6>
              <p className="p-b-28">
                An outdoor sign is an attractive and eye-catching tool.  Each outdoor sign that Banner Shop produces is customized with your own images, and laminated for additional durability against the elements.  We can construct create vinyl banners, wall graphics, posters, and vehicle graphics that can help promote your business to residents throughout the San Francisco Bay Area
              </p>

              <h6 className="p-t-15 p-b-16">Banner Stands and Displays</h6>
              <p className="p-b-28">
              Create a banner that is movable and presentable.  Use a retractable banner stand!  We use the same fine materials to create your advertisement, but apply it to a banner stand format.  Our banner stands range in size and are lightweight, portable and easy to set up.  Each retractable banner stand made by Banner Stand also comes with a free carrying case.  We also create display stands and A-frame stands that are made from heavy-duty material and use high-quality inks that give them durability and longevity.
              </p>

              <p className="p-b-28">
              Contact Banner Shop today for your Bay Area outdoor sign, large photo printing and other vinyl banner printing needs!
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default About;