import imageAnalyze from '#/images/analyze.jpg';
import { List, ListItem } from '#/ui/list';
import { Section } from '#/ui/process/section';

import { ImageCredit } from './image-credit';

export function AnalyzeImprove() {
  return (
    <Section
      title="Analyze, improve, & scale"
      image={{ src: imageAnalyze, flipped: true }}
    >
      <div className="space-y-6 text-sm text-muted-foreground md:text-base">
        <p>
          We&apos;ll squint at dashboards full of numbers, desperately searching
          for insights. (while silently wishing we&apos;d paid more attention in
          math class)
        </p>
        <p>
          Don&apos;t be fooled by words like &quot;data-driven&quot; and
          &quot;validate.&quot; We&apos;re basically making educated guesses and
          hoping you can&apos;t tell the difference.
        </p>
        <p>
          Expect random tweaks, cleverly disguised as &quot;strategic
          experiments.&quot; It&apos;s a whole lotta trial and error (mostly
          error). And if anyone asks about scaling? We&apos;ll offer a
          reassuring smile. Meanwhile, we&apos;re secretly hoping your sudden
          growth spurt looks like the magic we &quot;planned.&quot;
        </p>
      </div>

      <h3 className="mt-12 font-mono text-base font-bold tracking-tighter text-secondary-foreground">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Data Diving">
          We plunge into the data ocean with a snorkel, hoping not to drown in
          analytics.
        </ListItem>
        <ListItem title="Error Guessing">
          Our error guessing game is strong. We call it strategic forecasting.
        </ListItem>
        <ListItem title="Improvisation">
          Our middle name. If there&apos;s a way to wing it, we&apos;ve already
          taken flight.
        </ListItem>
        <ListItem title="Feedback Loops">
          We love feedback loops. They&apos;re like echo chambers but with more
          nodding.
        </ListItem>
        <ListItem title="Optimization Theatre">
          We perform optimization rituals. Effectiveness may vary.
        </ListItem>
      </List>
      <ImageCredit
        photographerName="GVZ 42"
        photographerUrl="https://unsplash.com/@gvz42?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
        photoUrl="https://unsplash.com/photos/a-close-up-of-a-table-with-a-glass-of-water-z47okydJjGs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      />
    </Section>
  );
}
