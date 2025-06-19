export const articles = [
  {
    id: 'marine-fish-acclimation',
    title: 'How to Acclimate Marine Fish',
    description: 'Learn the proper steps to safely introduce new fish to your aquarium',
    image: 'https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg',
    category: 'fish-care',
    content: `
# How to Acclimate Marine Fish

Proper acclimation is crucial for the survival of marine fish when introducing them to your aquarium. Follow these steps for the best results:

## Temperature Acclimation
1. Float the bag in your aquarium for 15-20 minutes
2. Keep lights dim to reduce stress
3. Never expose the bag to direct light

## Water Chemistry Acclimation
1. Open the bag and roll down the top
2. Add 1/2 cup of aquarium water every 5 minutes
3. Repeat for 30 minutes
4. Gently net the fish and introduce to aquarium
5. Never pour bag water into your aquarium

## Post-Introduction Care
- Monitor the fish closely for the first hour
- Watch for normal swimming behavior
- Ensure other fish are not showing aggression
- Wait 2-3 hours before first feeding
    `
  },
  {
    id: 'water-parameters',
    title: 'Water Parameters Guide',
    description: 'Essential knowledge about maintaining optimal water conditions',
    image: 'https://images.pexels.com/photos/2122276/pexels-photo-2122276.jpeg',
    category: 'maintenance',
    content: `
# Water Parameters Guide

Maintaining proper water parameters is essential for a healthy marine aquarium.

## Key Parameters to Monitor

### Temperature
- Optimal range: 75-78°F (24-26°C)
- Maintain stability within ±1°F
- Use reliable thermometer

### Salinity
- Target: 1.020-1.025 specific gravity
- Use calibrated refractometer
- Avoid sudden changes

### pH
- Target range: 8.1-8.4
- Test weekly
- Maintain stable levels

### Other Important Parameters
- Ammonia: 0 ppm
- Nitrite: 0 ppm
- Nitrate: <10 ppm
- Phosphate: <0.05 ppm
    `
  },
  {
    id: 'coral-feeding',
    title: 'Coral Feeding Guide',
    description: 'Understanding different coral species and their nutritional needs',
    image: 'https://images.pexels.com/photos/3157884/pexels-photo-3157884.jpeg',
    category: 'coral-care',
    content: `
# Coral Feeding Guide

While corals receive much of their nutrition from their symbiotic relationship with zooxanthellae, many species benefit from supplemental feeding.

## Types of Coral Food

### For LPS Corals
- Mysis shrimp
- Cyclops
- Marine snow
- Amino acid supplements

### For SPS Corals
- Phytoplankton
- Coral food powders
- Amino acids
- Trace elements

## Feeding Schedule
- Feed most corals 2-3 times per week
- Target feed LPS corals directly
- Broadcast feed for SPS colonies
- Feed at night when polyps are extended
    `
  }
];

export const categories = {
  'fish-care': {
    name: 'Fish Care',
    emoji: '🐠'
  },
  'coral-care': {
    name: 'Coral Care',
    emoji: '🪸'
  },
  'maintenance': {
    name: 'Maintenance',
    emoji: '🧪'
  }
};