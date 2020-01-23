import { Selector, ClientFunction } from 'testcafe';

fixture`Getting started with people App`.page`http://localhost:3005/`;

test('Renders all regions', async t => {
  await t.expect(Selector('section.western > div > div > h3').withText('Western').exists).ok();
  await t.expect(Selector('section.northern > div > div > h3').withText('Northern').exists).ok();
  await t.expect(Selector('section.southern > div > div > h3').withText('Southern').exists).ok();
  await t.expect(Selector('section.central > div > div > h3').withText('Central').exists).ok();
  await t.expect(Selector('section.eastern > div > div > h3').withText('Eastern').exists).ok();
});

test('Has see All links with right region parameters', async t => {
  const westernLink = Selector('section.western > div > a');
  const southernLink = Selector('section.southern > div > a');
  const getLocation = ClientFunction(() => document.location.href.toString());
  const back = ClientFunction(() => window.history.back());
  await t.click(westernLink);
  await t.expect(getLocation()).contains('people?region=western');
  await back();
  await t.click(southernLink);
  await t.expect(getLocation()).contains('people?region=southern');
});

test('It has a navbar with 3 links', async t => {
  const navbarExists = Selector('div.pp-nav').exists;
  const linkCount = Selector('div.pp-nav a').count;
  await t
    .expect(linkCount)
    .eql(3)
    .expect(navbarExists)
    .ok();
});

test('Navigation with navlink click', async t => {
  const peopleLink = Selector('div > section.right-section > a:nth-child(1)');
  const getLocation = ClientFunction(() => document.location.href.toString());
  await t.click(peopleLink);
  await t.expect(getLocation()).contains('people');
});

test('Peoplez page renders well', async t => {
  const peopleLink = Selector('div > section.right-section > a:nth-child(1)');
  await t.click(peopleLink);
  const header = Selector('section > div.header > h4').withText(
    'See all people from various regions, you can filter by region to reduce the view results'
  );
  const filters = Selector('section > div.regions-container > section.region-filters');
  const regions = Selector('section > div.regions-container > section.region');
  await t.expect(header.exists).ok();
  await t.expect(filters.exists).ok();
  await t.expect(regions.exists).ok();
});
