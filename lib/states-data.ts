export interface StateData {
  name: string;
  abbreviation: string;
  region: string;
  usdaZones: string;
  speciesCount: number;
  commonSpecies: string[];
  peakViewingMonths: string;
  hotspots: string[];
  gardenTips: string;
}

export const statesData: StateData[] = [
  { name: "Alabama", abbreviation: "AL", region: "Southeast", usdaZones: "7–8", speciesCount: 2, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "April–September", hotspots: ["Dauphin Island", "Oak Mountain State Park"], gardenTips: "Plant trumpet vine and bee balm for summer visitors." },
  { name: "Alaska", abbreviation: "AK", region: "Pacific Northwest", usdaZones: "1–7", speciesCount: 3, commonSpecies: ["Rufous Hummingbird", "Anna's Hummingbird"], peakViewingMonths: "May–August", hotspots: ["Juneau", "Ketchikan", "Sitka"], gardenTips: "Plant red flowering currant and salvia to attract early migrants." },
  { name: "Arizona", abbreviation: "AZ", region: "Southwest", usdaZones: "5–10", speciesCount: 15, commonSpecies: ["Black-chinned Hummingbird", "Anna's Hummingbird", "Costa's Hummingbird", "Broad-billed Hummingbird", "Blue-throated Mountain-gem"], peakViewingMonths: "Year-round", hotspots: ["Madera Canyon", "Ramsey Canyon", "Carr Canyon", "Cave Creek Canyon"], gardenTips: "Arizona is the hummingbird capital of the USA. Plant agave, ocotillo, and salvia for year-round attraction." },
  { name: "Arkansas", abbreviation: "AR", region: "South Central", usdaZones: "6–8", speciesCount: 1, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "April–October", hotspots: ["Ouachita National Forest", "Buffalo National River"], gardenTips: "Cardinal flower and trumpet vine are top producers." },
  { name: "California", abbreviation: "CA", region: "Pacific Coast", usdaZones: "5–11", speciesCount: 7, commonSpecies: ["Anna's Hummingbird", "Allen's Hummingbird", "Black-chinned Hummingbird", "Rufous Hummingbird", "Costa's Hummingbird"], peakViewingMonths: "Year-round", hotspots: ["Point Reyes", "Morro Bay", "Anza-Borrego Desert SP", "San Bernardino Mountains"], gardenTips: "Anna's Hummingbirds are year-round residents. Plant fuchsia, salvia, and flowering currant." },
  { name: "Colorado", abbreviation: "CO", region: "Mountain West", usdaZones: "3–7", speciesCount: 5, commonSpecies: ["Broad-tailed Hummingbird", "Black-chinned Hummingbird", "Rufous Hummingbird", "Calliope Hummingbird"], peakViewingMonths: "May–September", hotspots: ["Rocky Mountain National Park", "Chautauqua Park Boulder", "Hummingbird Heaven Beulah"], gardenTips: "Plant penstemons and scarlet gilia for mountain species. Keep feeders up until mid-September." },
  { name: "Connecticut", abbreviation: "CT", region: "Northeast", usdaZones: "6–7", speciesCount: 1, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "May–September", hotspots: ["Audubon Center Greenwich", "White Memorial Foundation"], gardenTips: "Bee balm and coral honeysuckle are reliable attractors. First arrivals in early May." },
  { name: "Florida", abbreviation: "FL", region: "Southeast", usdaZones: "8–11", speciesCount: 4, commonSpecies: ["Ruby-throated Hummingbird", "Rufous Hummingbird", "Black-chinned Hummingbird"], peakViewingMonths: "March–May & August–November", hotspots: ["Wakulla Springs", "Big Cypress National Preserve", "Corkscrew Swamp"], gardenTips: "Keep feeders up in winter as rare western species often winter here. Firebush is excellent." },
  { name: "Georgia", abbreviation: "GA", region: "Southeast", usdaZones: "6–9", speciesCount: 2, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "April–October", hotspots: ["Callaway Gardens", "Jekyll Island", "Kennesaw Mountain"], gardenTips: "Native salvia and cardinal flower are must-haves. Expect arrivals in mid-April." },
  { name: "Illinois", abbreviation: "IL", region: "Midwest", usdaZones: "5–6", speciesCount: 1, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "May–September", hotspots: ["Shawnee National Forest", "Morton Arboretum"], gardenTips: "Plant trumpet vine on fences and trellises. Keep feeders up through late September." },
  { name: "Michigan", abbreviation: "MI", region: "Midwest", usdaZones: "4–6", speciesCount: 2, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "May–September", hotspots: ["Porcupine Mountains SP", "Pictured Rocks"], gardenTips: "Arrivals in mid-May. Bee balm and impatiens work well in the garden." },
  { name: "New Mexico", abbreviation: "NM", region: "Southwest", usdaZones: "4–9", speciesCount: 12, commonSpecies: ["Black-chinned Hummingbird", "Broad-tailed Hummingbird", "Rufous Hummingbird", "Calliope Hummingbird"], peakViewingMonths: "April–October", hotspots: ["Gila Wilderness", "Bosque del Apache", "Sandia Mountains"], gardenTips: "Second only to Arizona in diversity. Plant penstemons, scarlet bouvardia, and agave." },
  { name: "New York", abbreviation: "NY", region: "Northeast", usdaZones: "3–7", speciesCount: 1, commonSpecies: ["Ruby-throated Hummingbird"], peakViewingMonths: "May–September", hotspots: ["Central Park NYC", "Jamaica Bay Wildlife Refuge", "Adirondacks"], gardenTips: "First arrivals typically early May in NYC area, later upstate. Bee balm is a top producer." },
  { name: "Oregon", abbreviation: "OR", region: "Pacific Northwest", usdaZones: "5–9", speciesCount: 4, commonSpecies: ["Rufous Hummingbird", "Anna's Hummingbird", "Black-chinned Hummingbird"], peakViewingMonths: "Year-round (coast)", hotspots: ["Crater Lake NP", "Willamette Valley", "Rogue River Valley"], gardenTips: "Anna's Hummingbirds are year-round residents on the coast. Plant salvia and flowering currant." },
  { name: "Texas", abbreviation: "TX", region: "South Central", usdaZones: "6–10", speciesCount: 18, commonSpecies: ["Ruby-throated Hummingbird", "Black-chinned Hummingbird", "Rufous Hummingbird", "Blue-throated Mountain-gem"], peakViewingMonths: "Year-round (south)", hotspots: ["Big Bend NP", "Davis Mountains", "High Island", "Laredo"], gardenTips: "Texas has the most hummingbird species of any state. Turk's cap and flame acanthus are native favorites." },
  { name: "Washington", abbreviation: "WA", region: "Pacific Northwest", usdaZones: "6–9", speciesCount: 4, commonSpecies: ["Rufous Hummingbird", "Anna's Hummingbird", "Calliope Hummingbird", "Black-chinned Hummingbird"], peakViewingMonths: "February–October", hotspots: ["Olympic NP", "North Cascades NP", "Seattle parks"], gardenTips: "Anna's Hummingbirds winter in western Washington. Plant red flowering currant for early spring migrants." },
];

export const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming"
];
