export interface BibleVerse {
  id: string;
  text: string;
  reference: string;
  translation: 'NIV';
  theme: string;
}

/**
 * Curated local collection of 40 verified Bible verses from the New International Version (NIV).
 * Selected for themes of hope, comfort, strength, faith, peace, healing, God's presence,
 * and encouragement during difficult seasons.
 */
export const bibleVerses: BibleVerse[] = [
  {
    id: 'philippians-4-6-7',
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    reference: 'Philippians 4:6–7',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'isaiah-41-10',
    text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    reference: 'Isaiah 41:10',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: 'jeremiah-29-11',
    text: '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
    reference: 'Jeremiah 29:11',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'matthew-11-28',
    text: '“Come to me, all you who are weary and burdened, and I will give you rest.”',
    reference: 'Matthew 11:28',
    translation: 'NIV',
    theme: 'Comfort',
  },
  {
    id: 'psalm-23-1-3',
    text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    reference: 'Psalm 23:1–3',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'proverbs-3-5-6',
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    reference: 'Proverbs 3:5–6',
    translation: 'NIV',
    theme: 'Faith',
  },
  {
    id: 'romans-8-28',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    reference: 'Romans 8:28',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'joshua-1-9',
    text: '“Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.”',
    reference: 'Joshua 1:9',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: 'psalm-46-1',
    text: 'God is our refuge and strength, an ever-present help in trouble.',
    reference: 'Psalm 46:1',
    translation: 'NIV',
    theme: 'Comfort',
  },
  {
    id: '2-corinthians-12-9',
    text: 'But he said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.',
    reference: '2 Corinthians 12:9',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: 'isaiah-40-31',
    text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    reference: 'Isaiah 40:31',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'psalm-34-18',
    text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
    reference: 'Psalm 34:18',
    translation: 'NIV',
    theme: 'Comfort',
  },
  {
    id: 'romans-15-13',
    text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
    reference: 'Romans 15:13',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'john-14-27',
    text: '“Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.”',
    reference: 'John 14:27',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'psalm-121-1-2',
    text: 'I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.',
    reference: 'Psalm 121:1–2',
    translation: 'NIV',
    theme: 'Comfort',
  },
  {
    id: '1-peter-5-7',
    text: 'Cast all your anxiety on him because he cares for you.',
    reference: '1 Peter 5:7',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'hebrews-11-1',
    text: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    reference: 'Hebrews 11:1',
    translation: 'NIV',
    theme: 'Faith',
  },
  {
    id: 'psalm-91-1-2',
    text: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, “He is my refuge and my fortress, my God, in whom I trust.”',
    reference: 'Psalm 91:1–2',
    translation: 'NIV',
    theme: 'Presence',
  },
  {
    id: 'romans-8-38-39',
    text: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.',
    reference: 'Romans 8:38–39',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'lamentations-3-22-23',
    text: 'Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
    reference: 'Lamentations 3:22–23',
    translation: 'NIV',
    theme: 'Faith',
  },
  {
    id: 'psalm-27-1',
    text: 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?',
    reference: 'Psalm 27:1',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: '2-timothy-1-7',
    text: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
    reference: '2 Timothy 1:7',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: 'psalm-62-1-2',
    text: 'Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation; he is my fortress, I will never be shaken.',
    reference: 'Psalm 62:1–2',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'zephaniah-3-17',
    text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
    reference: 'Zephaniah 3:17',
    translation: 'NIV',
    theme: 'Presence',
  },
  {
    id: 'psalm-147-3',
    text: 'He heals the brokenhearted and binds up their wounds.',
    reference: 'Psalm 147:3',
    translation: 'NIV',
    theme: 'Healing',
  },
  {
    id: '2-corinthians-1-3-4',
    text: 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.',
    reference: '2 Corinthians 1:3–4',
    translation: 'NIV',
    theme: 'Comfort',
  },
  {
    id: 'matthew-6-33',
    text: '“But seek first his kingdom and his righteousness, and all these things will be given to you as well.”',
    reference: 'Matthew 6:33',
    translation: 'NIV',
    theme: 'Faith',
  },
  {
    id: 'psalm-103-2-4',
    text: 'Praise the Lord, my soul, and forget not all his benefits—who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion.',
    reference: 'Psalm 103:2–4',
    translation: 'NIV',
    theme: 'Healing',
  },
  {
    id: 'deuteronomy-31-8',
    text: '“The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.”',
    reference: 'Deuteronomy 31:8',
    translation: 'NIV',
    theme: 'Presence',
  },
  {
    id: 'psalm-37-5',
    text: 'Commit your way to the Lord; trust in him and he will do this.',
    reference: 'Psalm 37:5',
    translation: 'NIV',
    theme: 'Faith',
  },
  {
    id: 'john-16-33',
    text: '“I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.”',
    reference: 'John 16:33',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'psalm-118-24',
    text: 'The Lord has done it this very day; let us rejoice today and be glad.',
    reference: 'Psalm 118:24',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'philippians-4-13',
    text: 'I can do all this through him who gives me strength.',
    reference: 'Philippians 4:13',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: 'psalm-138-3',
    text: 'When I called, you answered me; you greatly emboldened me.',
    reference: 'Psalm 138:3',
    translation: 'NIV',
    theme: 'Strength',
  },
  {
    id: 'isaiah-26-3',
    text: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.',
    reference: 'Isaiah 26:3',
    translation: 'NIV',
    theme: 'Peace',
  },
  {
    id: 'psalm-119-105',
    text: 'Your word is a lamp for my feet, a light on my path.',
    reference: 'Psalm 119:105',
    translation: 'NIV',
    theme: 'Faith',
  },
  {
    id: 'ephesians-3-20-21',
    text: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us, to him be glory in the church and in Christ Jesus throughout all generations, for ever and ever! Amen.',
    reference: 'Ephesians 3:20–21',
    translation: 'NIV',
    theme: 'Hope',
  },
  {
    id: 'psalm-16-8',
    text: 'I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.',
    reference: 'Psalm 16:8',
    translation: 'NIV',
    theme: 'Presence',
  },
  {
    id: 'nahum-1-7',
    text: 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.',
    reference: 'Nahum 1:7',
    translation: 'NIV',
    theme: 'Comfort',
  },
  {
    id: 'colossians-3-15',
    text: 'Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.',
    reference: 'Colossians 3:15',
    translation: 'NIV',
    theme: 'Peace',
  },
];

/**
 * Returns a randomly selected Bible verse, avoiding immediate repetition of previousIndex.
 */
export function getRandomVerse(previousIndex?: number): { verse: BibleVerse; index: number } {
  if (bibleVerses.length === 0) {
    throw new Error('No verses available');
  }
  if (bibleVerses.length === 1) {
    return { verse: bibleVerses[0], index: 0 };
  }

  let nextIndex: number;
  do {
    nextIndex = Math.floor(Math.random() * bibleVerses.length);
  } while (nextIndex === previousIndex);

  return { verse: bibleVerses[nextIndex], index: nextIndex };
}
