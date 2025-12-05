import { BookOpenIcon, ChartBarIcon, StarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Personal Reading List',
    description: 'Create and manage your personal collection of books you want to read or have already read.',
    icon: BookOpenIcon,
  },
  {
    name: 'Track Your Progress',
    description: 'Mark books as read or unread and keep track of your reading journey over time.',
    icon: ChartBarIcon,
  },
  {
    name: 'Discover New Books',
    description: 'Explore curated collections and discover your next favorite book from our extensive library.',
    icon: StarIcon,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to organize your reading
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => {
              const gradients = [
                'bg-gradient-to-br from-rose-100 to-pink-200',
                'bg-gradient-to-br from-orange-100 to-amber-200', 
                'bg-gradient-to-br from-violet-100 to-purple-200'
              ];
              const iconColors = [
                'bg-rose-500 group-hover:bg-rose-600',
                'bg-orange-500 group-hover:bg-orange-600',
                'bg-violet-500 group-hover:bg-violet-600'
              ];
              return (
              <div key={feature.name} className={`group relative ${gradients[index]} rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}>
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconColors[index]} transition-colors`}>
                    <feature.icon className="h-5 w-5 flex-none text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base leading-6 text-gray-600">
                  <p>{feature.description}</p>
                </dd>
              </div>
            )})}
          </dl>
        </div>
      </div>
    </section>
  );
}