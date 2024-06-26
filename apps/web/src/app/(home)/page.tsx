import { fetchRecentShowcaseBriefs } from '#/basehub/showcase-queries';
import HomePageJson from '#/json-ld/home-jsonld';
import { Hero } from '#/ui/home/hero';
import { Introduction } from '#/ui/home/introduction';
import { Mettle } from '#/ui/home/mettle';
import { Process } from '#/ui/home/process';
import { Resources } from '#/ui/home/resources';
import { Showcase } from '#/ui/home/showcase';
import { Tldr } from '#/ui/home/tldr';
import { Footer } from '#/ui/layout/footer';
import { NavBar } from '#/ui/layout/navbar';
import { Cta } from '#/ui/shared/cta';
import { BigWarning } from '#/ui/warnings/big-warning';
import { Warnings } from '#/ui/warnings/warnings';

export default async function Home() {
  const projectBriefs = await fetchRecentShowcaseBriefs();
  return (
    <>
      <Hero />
      <Introduction />
      <NavBar />
      <Mettle />
      <Showcase projectBriefs={projectBriefs} />
      <BigWarning
        id="untestimonial-1"
        author={{
          name: 'Peter J.',
          role: 'Founder ',
          initials: 'PJT',
        }}
      >
        <p>
          “Hiring Yo! CXO? Bad idea. They&apos;re the kind of problem-solvers
          you think you want until you realize everyone else will want them
          too.”
        </p>
      </BigWarning>
      <Process />
      <BigWarning
        id="testimonial-from-gerardo-stark"
        author={{
          name: 'Aditya A.',
          role: 'Protector of mediocrity',
          initials: 'AA',
        }}
      >
        <p>
          “I hired Sam at two of my companies. The problem is, he does so much
          that everyone expected the rest of us to step up too.”
        </p>
      </BigWarning>
      <Resources />
      <Cta />
      <Warnings />
      <Tldr />
      <Footer />
      <HomePageJson />
    </>
  );
}
