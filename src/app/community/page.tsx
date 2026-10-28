import { permanentRedirect } from 'next/navigation';

export default function CommunityIndexPage() {
  permanentRedirect('/community/food-providers');
}
