/**
 * ISO 3166-1 Country Code Mappings https://en.wikipedia.org/wiki/ISO_3166-1_numeric
 * 
 * This file contains mappings between:
 * - numeric codes (used in the GeoJSON)
 * - alpha-3 codes (used in our data)
 * - country names (used for display)
 * - alpha-2 codes (used for flag emojis)
 * - continents (used for grouping)
 */

// Mapping from numeric codes to alpha-3
export const numericToAlpha3: Record<string, string> = {
  '004': 'AFG', // Afghanistan
  '008': 'ALB', // Albania
  '012': 'DZA', // Algeria
  '016': 'ASM', // American Samoa
  '020': 'AND', // Andorra
  '024': 'AGO', // Angola
  '028': 'ATG', // Antigua and Barbuda
  '031': 'AZE', // Azerbaijan
  '032': 'ARG', // Argentina
  '036': 'AUS', // Australia
  '040': 'AUT', // Austria
  '044': 'BHS', // Bahamas
  '048': 'BHR', // Bahrain
  '050': 'BGD', // Bangladesh
  '051': 'ARM', // Armenia
  '052': 'BRB', // Barbados
  '056': 'BEL', // Belgium
  '060': 'BMU', // Bermuda
  '064': 'BTN', // Bhutan
  '068': 'BOL', // Bolivia
  '070': 'BIH', // Bosnia and Herzegovina
  '072': 'BWA', // Botswana
  '076': 'BRA', // Brazil
  '084': 'BLZ', // Belize
  '090': 'SLB', // Solomon Islands
  '092': 'VGB', // Virgin Islands, British
  '096': 'BRN', // Brunei Darussalam
  '100': 'BGR', // Bulgaria
  '104': 'MMR', // Myanmar
  '108': 'BDI', // Burundi
  '112': 'BLR', // Belarus
  '116': 'KHM', // Cambodia
  '120': 'CMR', // Cameroon
  '124': 'CAN', // Canada
  '132': 'CPV', // Cape Verde
  '136': 'CYM', // Cayman Islands
  '140': 'CAF', // Central African Republic
  '144': 'LKA', // Sri Lanka
  '148': 'TCD', // Chad
  '152': 'CHL', // Chile
  '156': 'CHN', // China
  '158': 'TWN', // Taiwan
  '170': 'COL', // Colombia
  '174': 'COM', // Comoros
  '175': 'MYT', // Mayotte
  '178': 'COG', // Congo
  '180': 'COD', // Democratic Republic of the Congo
  '184': 'COK', // Cook Islands
  '188': 'CRI', // Costa Rica
  '191': 'HRV', // Croatia
  '192': 'CUB', // Cuba
  '196': 'CYP', // Cyprus
  '203': 'CZE', // Czech Republic
  '204': 'BEN', // Benin
  '208': 'DNK', // Denmark
  '212': 'DMA', // Dominica
  '214': 'DOM', // Dominican Republic
  '218': 'ECU', // Ecuador
  '222': 'SLV', // El Salvador
  '226': 'GNQ', // Equatorial Guinea
  '231': 'ETH', // Ethiopia
  '232': 'ERI', // Eritrea
  '233': 'EST', // Estonia
  '234': 'FRO', // Faroe Islands
  '238': 'FLK', // Falkland Islands
  '242': 'FJI', // Fiji
  '246': 'FIN', // Finland
  '248': 'ALA', // Åland Islands
  '250': 'FRA', // France
  '254': 'GUF', // French Guiana
  '258': 'PYF', // French Polynesia
  '262': 'DJI', // Djibouti
  '266': 'GAB', // Gabon
  '268': 'GEO', // Georgia
  '270': 'GMB', // Gambia
  '275': 'PSE', // Palestine
  '276': 'DEU', // Germany
  '288': 'GHA', // Ghana
  '292': 'GIB', // Gibraltar
  '296': 'KIR', // Kiribati
  '300': 'GRC', // Greece
  '304': 'GRL', // Greenland
  '308': 'GRD', // Grenada
  '312': 'GLP', // Guadeloupe
  '316': 'GUM', // Guam
  '320': 'GTM', // Guatemala
  '324': 'GIN', // Guinea
  '328': 'GUY', // Guyana
  '332': 'HTI', // Haiti
  '334': 'HMD', // Heard Island and McDonald Islands
  '336': 'VAT', // Holy See
  '340': 'HND', // Honduras
  '344': 'HKG', // Hong Kong
  '348': 'HUN', // Hungary
  '352': 'ISL', // Iceland
  '356': 'IND', // India
  '360': 'IDN', // Indonesia
  '364': 'IRN', // Iran
  '368': 'IRQ', // Iraq
  '372': 'IRL', // Ireland
  '376': 'ISR', // Israel
  '380': 'ITA', // Italy
  '384': 'CIV', // Côte d'Ivoire
  '388': 'JAM', // Jamaica
  '392': 'JPN', // Japan
  '398': 'KAZ', // Kazakhstan
  '400': 'JOR', // Jordan
  '404': 'KEN', // Kenya
  '408': 'PRK', // North Korea
  '410': 'KOR', // South Korea
  '414': 'KWT', // Kuwait
  '417': 'KGZ', // Kyrgyzstan
  '418': 'LAO', // Lao People's Democratic Republic
  '422': 'LBN', // Lebanon
  '426': 'LSO', // Lesotho
  '428': 'LVA', // Latvia
  '430': 'LBR', // Liberia
  '434': 'LBY', // Libya
  '438': 'LIE', // Liechtenstein
  '440': 'LTU', // Lithuania
  '442': 'LUX', // Luxembourg
  '446': 'MAC', // Macao
  '450': 'MDG', // Madagascar
  '454': 'MWI', // Malawi
  '458': 'MYS', // Malaysia
  '462': 'MDV', // Maldives
  '466': 'MLI', // Mali
  '470': 'MLT', // Malta
  '474': 'MTQ', // Martinique
  '478': 'MRT', // Mauritania
  '480': 'MUS', // Mauritius
  '484': 'MEX', // Mexico
  '492': 'MCO', // Monaco
  '496': 'MNG', // Mongolia
  '498': 'MDA', // Moldova
  '499': 'MNE', // Montenegro
  '500': 'MSR', // Montserrat
  '504': 'MAR', // Morocco
  '508': 'MOZ', // Mozambique
  '512': 'OMN', // Oman
  '516': 'NAM', // Namibia
  '520': 'NRU', // Nauru
  '524': 'NPL', // Nepal
  '528': 'NLD', // Netherlands
  '531': 'CUW', // Curaçao
  '533': 'ABW', // Aruba
  '534': 'SXM', // Sint Maarten
  '535': 'BES', // Bonaire, Sint Eustatius and Saba
  '540': 'NCL', // New Caledonia
  '548': 'VUT', // Vanuatu
  '554': 'NZL', // New Zealand
  '558': 'NIC', // Nicaragua
  '562': 'NER', // Niger
  '566': 'NGA', // Nigeria
  '570': 'NIU', // Niue
  '574': 'NFK', // Norfolk Island
  '578': 'NOR', // Norway
  '580': 'MNP', // Northern Mariana Islands
  '581': 'UMI', // United States Minor Outlying Islands
  '583': 'FSM', // Micronesia
  '584': 'MHL', // Marshall Islands
  '585': 'PLW', // Palau
  '586': 'PAK', // Pakistan
  '591': 'PAN', // Panama
  '598': 'PNG', // Papua New Guinea
  '600': 'PRY', // Paraguay
  '604': 'PER', // Peru
  '608': 'PHL', // Philippines
  '612': 'PCN', // Pitcairn
  '616': 'POL', // Poland
  '620': 'PRT', // Portugal
  '624': 'GNB', // Guinea-Bissau
  '626': 'TLS', // Timor-Leste
  '630': 'PRI', // Puerto Rico
  '634': 'QAT', // Qatar
  '638': 'REU', // Réunion
  '642': 'ROU', // Romania
  '643': 'RUS', // Russian Federation
  '646': 'RWA', // Rwanda
  '652': 'BLM', // Saint Barthélemy
  '654': 'SHN', // Saint Helena, Ascension and Tristan da Cunha
  '659': 'KNA', // Saint Kitts and Nevis
  '660': 'AIA', // Anguilla
  '662': 'LCA', // Saint Lucia
  '663': 'MAF', // Saint Martin
  '666': 'SPM', // Saint Pierre and Miquelon
  '670': 'VCT', // Saint Vincent and the Grenadines
  '674': 'SMR', // San Marino
  '678': 'STP', // Sao Tome and Principe
  '682': 'SAU', // Saudi Arabia
  '686': 'SEN', // Senegal
  '688': 'SRB', // Serbia
  '690': 'SYC', // Seychelles
  '694': 'SLE', // Sierra Leone
  '702': 'SGP', // Singapore
  '703': 'SVK', // Slovakia
  '704': 'VNM', // Vietnam
  '705': 'SVN', // Slovenia
  '706': 'SOM', // Somalia
  '710': 'ZAF', // South Africa
  '716': 'ZWE', // Zimbabwe
  '724': 'ESP', // Spain
  '728': 'SSD', // South Sudan
  '729': 'SDN', // Sudan
  '732': 'ESH', // Western Sahara
  '740': 'SUR', // Suriname
  '744': 'SJM', // Svalbard and Jan Mayen
  '748': 'SWZ', // Eswatini
  '752': 'SWE', // Sweden
  '756': 'CHE', // Switzerland
  '760': 'SYR', // Syrian Arab Republic
  '762': 'TJK', // Tajikistan
  '764': 'THA', // Thailand
  '768': 'TGO', // Togo
  '772': 'TKL', // Tokelau
  '776': 'TON', // Tonga
  '780': 'TTO', // Trinidad and Tobago
  '784': 'ARE', // United Arab Emirates
  '788': 'TUN', // Tunisia
  '792': 'TUR', // Turkey
  '795': 'TKM', // Turkmenistan
  '796': 'TCA', // Turks and Caicos Islands
  '798': 'TUV', // Tuvalu
  '800': 'UGA', // Uganda
  '804': 'UKR', // Ukraine
  '807': 'MKD', // North Macedonia
  '818': 'EGY', // Egypt
  '826': 'GBR', // United Kingdom
  '831': 'GGY', // Guernsey
  '832': 'JEY', // Jersey
  '833': 'IMN', // Isle of Man
  '834': 'TZA', // Tanzania
  '840': 'USA', // United States of America
  '850': 'VIR', // Virgin Islands, U.S.
  '854': 'BFA', // Burkina Faso
  '858': 'URY', // Uruguay
  '860': 'UZB', // Uzbekistan
  '862': 'VEN', // Venezuela
  '876': 'WLF', // Wallis and Futuna
  '882': 'WSM', // Samoa
  '887': 'YEM', // Yemen
  '894': 'ZMB', // Zambia
};

// Mapping from alpha-3 to country names
export const alpha3ToName: Record<string, string> = {
  'AFG': 'Afghanistan',
  'ALB': 'Albania',
  'DZA': 'Algeria',
  'ASM': 'American Samoa',
  'AND': 'Andorra',
  'AGO': 'Angola',
  'ATG': 'Antigua and Barbuda',
  'AZE': 'Azerbaijan',
  'ARG': 'Argentina',
  'AUS': 'Australia',
  'AUT': 'Austria',
  'BHS': 'Bahamas',
  'BHR': 'Bahrain',
  'BGD': 'Bangladesh',
  'ARM': 'Armenia',
  'BRB': 'Barbados',
  'BEL': 'Belgium',
  'BMU': 'Bermuda',
  'BTN': 'Bhutan',
  'BOL': 'Bolivia',
  'BIH': 'Bosnia and Herzegovina',
  'BWA': 'Botswana',
  'BRA': 'Brazil',
  'BLZ': 'Belize',
  'SLB': 'Solomon Islands',
  'VGB': 'British Virgin Islands',
  'BRN': 'Brunei',
  'BGR': 'Bulgaria',
  'MMR': 'Myanmar',
  'BDI': 'Burundi',
  'BLR': 'Belarus',
  'KHM': 'Cambodia',
  'CMR': 'Cameroon',
  'CAN': 'Canada',
  'CPV': 'Cape Verde',
  'CYM': 'Cayman Islands',
  'CAF': 'Central African Republic',
  'LKA': 'Sri Lanka',
  'TCD': 'Chad',
  'CHL': 'Chile',
  'CHN': 'China',
  'TWN': 'Taiwan',
  'COL': 'Colombia',
  'COM': 'Comoros',
  'MYT': 'Mayotte',
  'COG': 'Congo',
  'COD': 'DR Congo',
  'COK': 'Cook Islands',
  'CRI': 'Costa Rica',
  'HRV': 'Croatia',
  'CUB': 'Cuba',
  'CYP': 'Cyprus',
  'CZE': 'Czech Republic',
  'BEN': 'Benin',
  'DNK': 'Denmark',
  'DMA': 'Dominica',
  'DOM': 'Dominican Republic',
  'ECU': 'Ecuador',
  'SLV': 'El Salvador',
  'GNQ': 'Equatorial Guinea',
  'ETH': 'Ethiopia',
  'ERI': 'Eritrea',
  'EST': 'Estonia',
  'FRO': 'Faroe Islands',
  'FLK': 'Falkland Islands',
  'FJI': 'Fiji',
  'FIN': 'Finland',
  'ALA': 'Åland Islands',
  'FRA': 'France',
  'GUF': 'French Guiana',
  'PYF': 'French Polynesia',
  'DJI': 'Djibouti',
  'GAB': 'Gabon',
  'GEO': 'Georgia',
  'GMB': 'Gambia',
  'PSE': 'Palestine',
  'DEU': 'Germany',
  'GHA': 'Ghana',
  'GIB': 'Gibraltar',
  'KIR': 'Kiribati',
  'GRC': 'Greece',
  'GRL': 'Greenland',
  'GRD': 'Grenada',
  'GLP': 'Guadeloupe',
  'GUM': 'Guam',
  'GTM': 'Guatemala',
  'GIN': 'Guinea',
  'GUY': 'Guyana',
  'HTI': 'Haiti',
  'VAT': 'Vatican City',
  'HND': 'Honduras',
  'HKG': 'Hong Kong',
  'HUN': 'Hungary',
  'ISL': 'Iceland',
  'IND': 'India',
  'IDN': 'Indonesia',
  'IRN': 'Iran',
  'IRQ': 'Iraq',
  'IRL': 'Ireland',
  'ISR': 'Israel',
  'ITA': 'Italy',
  'CIV': 'Côte d\'Ivoire',
  'JAM': 'Jamaica',
  'JPN': 'Japan',
  'KAZ': 'Kazakhstan',
  'JOR': 'Jordan',
  'KEN': 'Kenya',
  'PRK': 'North Korea',
  'KOR': 'South Korea',
  'KWT': 'Kuwait',
  'KGZ': 'Kyrgyzstan',
  'LAO': 'Laos',
  'LBN': 'Lebanon',
  'LSO': 'Lesotho',
  'LVA': 'Latvia',
  'LBR': 'Liberia',
  'LBY': 'Libya',
  'LIE': 'Liechtenstein',
  'LTU': 'Lithuania',
  'LUX': 'Luxembourg',
  'MAC': 'Macao',
  'MDG': 'Madagascar',
  'MWI': 'Malawi',
  'MYS': 'Malaysia',
  'MDV': 'Maldives',
  'MLI': 'Mali',
  'MLT': 'Malta',
  'MTQ': 'Martinique',
  'MRT': 'Mauritania',
  'MUS': 'Mauritius',
  'MEX': 'Mexico',
  'MCO': 'Monaco',
  'MNG': 'Mongolia',
  'MDA': 'Moldova',
  'MNE': 'Montenegro',
  'MSR': 'Montserrat',
  'MAR': 'Morocco',
  'MOZ': 'Mozambique',
  'OMN': 'Oman',
  'NAM': 'Namibia',
  'NRU': 'Nauru',
  'NPL': 'Nepal',
  'NLD': 'Netherlands',
  'CUW': 'Curaçao',
  'ABW': 'Aruba',
  'SXM': 'Sint Maarten',
  'BES': 'Caribbean Netherlands',
  'NCL': 'New Caledonia',
  'VUT': 'Vanuatu',
  'NZL': 'New Zealand',
  'NIC': 'Nicaragua',
  'NER': 'Niger',
  'NGA': 'Nigeria',
  'NIU': 'Niue',
  'NFK': 'Norfolk Island',
  'NOR': 'Norway',
  'MNP': 'Northern Mariana Islands',
  'UMI': 'United States Minor Outlying Islands',
  'FSM': 'Micronesia',
  'MHL': 'Marshall Islands',
  'PLW': 'Palau',
  'PAK': 'Pakistan',
  'PAN': 'Panama',
  'PNG': 'Papua New Guinea',
  'PRY': 'Paraguay',
  'PER': 'Peru',
  'PHL': 'Philippines',
  'PCN': 'Pitcairn Islands',
  'POL': 'Poland',
  'PRT': 'Portugal',
  'GNB': 'Guinea-Bissau',
  'TLS': 'Timor-Leste',
  'PRI': 'Puerto Rico',
  'QAT': 'Qatar',
  'REU': 'Réunion',
  'ROU': 'Romania',
  'RUS': 'Russia',
  'RWA': 'Rwanda',
  'BLM': 'Saint Barthélemy',
  'SHN': 'Saint Helena',
  'KNA': 'Saint Kitts and Nevis',
  'AIA': 'Anguilla',
  'LCA': 'Saint Lucia',
  'MAF': 'Saint Martin',
  'SPM': 'Saint Pierre and Miquelon',
  'VCT': 'Saint Vincent and the Grenadines',
  'SMR': 'San Marino',
  'STP': 'São Tomé and Príncipe',
  'SAU': 'Saudi Arabia',
  'SEN': 'Senegal',
  'SRB': 'Serbia',
  'SYC': 'Seychelles',
  'SLE': 'Sierra Leone',
  'SGP': 'Singapore',
  'SVK': 'Slovakia',
  'VNM': 'Vietnam',
  'SVN': 'Slovenia',
  'SOM': 'Somalia',
  'ZAF': 'South Africa',
  'ZWE': 'Zimbabwe',
  'ESP': 'Spain',
  'SSD': 'South Sudan',
  'SDN': 'Sudan',
  'ESH': 'Western Sahara',
  'SUR': 'Suriname',
  'SJM': 'Svalbard and Jan Mayen',
  'SWZ': 'Eswatini',
  'SWE': 'Sweden',
  'CHE': 'Switzerland',
  'SYR': 'Syria',
  'TJK': 'Tajikistan',
  'THA': 'Thailand',
  'TGO': 'Togo',
  'TKL': 'Tokelau',
  'TON': 'Tonga',
  'TTO': 'Trinidad and Tobago',
  'ARE': 'United Arab Emirates',
  'TUN': 'Tunisia',
  'TUR': 'Turkey',
  'TKM': 'Turkmenistan',
  'TCA': 'Turks and Caicos Islands',
  'TUV': 'Tuvalu',
  'UGA': 'Uganda',
  'UKR': 'Ukraine',
  'MKD': 'North Macedonia',
  'EGY': 'Egypt',
  'GBR': 'United Kingdom',
  'GGY': 'Guernsey',
  'JEY': 'Jersey',
  'IMN': 'Isle of Man',
  'TZA': 'Tanzania',
  'USA': 'United States',
  'VIR': 'U.S. Virgin Islands',
  'BFA': 'Burkina Faso',
  'URY': 'Uruguay',
  'UZB': 'Uzbekistan',
  'VEN': 'Venezuela',
  'WLF': 'Wallis and Futuna',
  'WSM': 'Samoa',
  'YEM': 'Yemen',
  'ZMB': 'Zambia'
};

// Alpha-3 to Alpha-2 mapping for flag emojis
export const alpha3ToAlpha2: Record<string, string> = {
  'AFG': 'AF', 'ALB': 'AL', 'DZA': 'DZ', 'ASM': 'AS', 'AND': 'AD', 'AGO': 'AO', 'ATG': 'AG',
  'AZE': 'AZ', 'ARG': 'AR', 'AUS': 'AU', 'AUT': 'AT', 'BHS': 'BS', 'BHR': 'BH', 'BGD': 'BD',
  'ARM': 'AM', 'BRB': 'BB', 'BEL': 'BE', 'BMU': 'BM', 'BTN': 'BT', 'BOL': 'BO', 'BIH': 'BA',
  'BWA': 'BW', 'BRA': 'BR', 'BLZ': 'BZ', 'SLB': 'SB', 'VGB': 'VG', 'BRN': 'BN', 'BGR': 'BG',
  'MMR': 'MM', 'BDI': 'BI', 'BLR': 'BY', 'KHM': 'KH', 'CMR': 'CM', 'CAN': 'CA', 'CPV': 'CV',
  'CYM': 'KY', 'CAF': 'CF', 'LKA': 'LK', 'TCD': 'TD', 'CHL': 'CL', 'CHN': 'CN', 'TWN': 'TW',
  'COL': 'CO', 'COM': 'KM', 'MYT': 'YT', 'COG': 'CG', 'COD': 'CD', 'COK': 'CK', 'CRI': 'CR',
  'HRV': 'HR', 'CUB': 'CU', 'CYP': 'CY', 'CZE': 'CZ', 'BEN': 'BJ', 'DNK': 'DK', 'DMA': 'DM',
  'DOM': 'DO', 'ECU': 'EC', 'SLV': 'SV', 'GNQ': 'GQ', 'ETH': 'ET', 'ERI': 'ER', 'EST': 'EE',
  'FRO': 'FO', 'FLK': 'FK', 'FJI': 'FJ', 'FIN': 'FI', 'ALA': 'AX', 'FRA': 'FR', 'GUF': 'GF',
  'PYF': 'PF', 'DJI': 'DJ', 'GAB': 'GA', 'GEO': 'GE', 'GMB': 'GM', 'PSE': 'PS', 'DEU': 'DE',
  'GHA': 'GH', 'GIB': 'GI', 'KIR': 'KI', 'GRC': 'GR', 'GRL': 'GL', 'GRD': 'GD', 'GLP': 'GP',
  'GUM': 'GU', 'GTM': 'GT', 'GIN': 'GN', 'GUY': 'GY', 'HTI': 'HT', 'VAT': 'VA', 'HND': 'HN',
  'HKG': 'HK', 'HUN': 'HU', 'ISL': 'IS', 'IND': 'IN', 'IDN': 'ID', 'IRN': 'IR', 'IRQ': 'IQ',
  'IRL': 'IE', 'ISR': 'IL', 'ITA': 'IT', 'CIV': 'CI', 'JAM': 'JM', 'JPN': 'JP', 'KAZ': 'KZ',
  'JOR': 'JO', 'KEN': 'KE', 'PRK': 'KP', 'KOR': 'KR', 'KWT': 'KW', 'KGZ': 'KG', 'LAO': 'LA',
  'LBN': 'LB', 'LSO': 'LS', 'LVA': 'LV', 'LBR': 'LR', 'LBY': 'LY', 'LIE': 'LI', 'LTU': 'LT',
  'LUX': 'LU', 'MAC': 'MO', 'MDG': 'MG', 'MWI': 'MW', 'MYS': 'MY', 'MDV': 'MV', 'MLI': 'ML',
  'MLT': 'MT', 'MTQ': 'MQ', 'MRT': 'MR', 'MUS': 'MU', 'MEX': 'MX', 'MCO': 'MC', 'MNG': 'MN',
  'MDA': 'MD', 'MNE': 'ME', 'MSR': 'MS', 'MAR': 'MA', 'MOZ': 'MZ', 'OMN': 'OM', 'NAM': 'NA',
  'NRU': 'NR', 'NPL': 'NP', 'NLD': 'NL', 'CUW': 'CW', 'ABW': 'AW', 'SXM': 'SX', 'BES': 'BQ',
  'NCL': 'NC', 'VUT': 'VU', 'NZL': 'NZ', 'NIC': 'NI', 'NER': 'NE', 'NGA': 'NG', 'NIU': 'NU',
  'NFK': 'NF', 'NOR': 'NO', 'MNP': 'MP', 'UMI': 'UM', 'FSM': 'FM', 'MHL': 'MH', 'PLW': 'PW',
  'PAK': 'PK', 'PAN': 'PA', 'PNG': 'PG', 'PRY': 'PY', 'PER': 'PE', 'PHL': 'PH', 'PCN': 'PN',
  'POL': 'PL', 'PRT': 'PT', 'GNB': 'GW', 'TLS': 'TL', 'PRI': 'PR', 'QAT': 'QA', 'REU': 'RE',
  'ROU': 'RO', 'RUS': 'RU', 'RWA': 'RW', 'BLM': 'BL', 'SHN': 'SH', 'KNA': 'KN', 'AIA': 'AI',
  'LCA': 'LC', 'MAF': 'MF', 'SPM': 'PM', 'VCT': 'VC', 'SMR': 'SM', 'STP': 'ST', 'SAU': 'SA',
  'SEN': 'SN', 'SRB': 'RS', 'SYC': 'SC', 'SLE': 'SL', 'SGP': 'SG', 'SVK': 'SK', 'VNM': 'VN',
  'SVN': 'SI', 'SOM': 'SO', 'ZAF': 'ZA', 'ZWE': 'ZW', 'ESP': 'ES', 'SSD': 'SS', 'SDN': 'SD',
  'ESH': 'EH', 'SUR': 'SR', 'SJM': 'SJ', 'SWZ': 'SZ', 'SWE': 'SE', 'CHE': 'CH', 'SYR': 'SY',
  'TJK': 'TJ', 'THA': 'TH', 'TGO': 'TG', 'TKL': 'TK', 'TON': 'TO', 'TTO': 'TT', 'ARE': 'AE',
  'TUN': 'TN', 'TUR': 'TR', 'TKM': 'TM', 'TCA': 'TC', 'TUV': 'TV', 'UGA': 'UG', 'UKR': 'UA',
  'MKD': 'MK', 'EGY': 'EG', 'GBR': 'GB', 'GGY': 'GG', 'JEY': 'JE', 'IMN': 'IM', 'TZA': 'TZ',
  'USA': 'US', 'VIR': 'VI', 'BFA': 'BF', 'URY': 'UY', 'UZB': 'UZ', 'VEN': 'VE', 'WLF': 'WF',
  'WSM': 'WS', 'YEM': 'YE', 'ZMB': 'ZM', 'XKX': 'XK', // Kosovo is not officially in ISO 3166
  'HMD': 'HM', 'SGS': 'GS', 'ATF': 'TF', 'IOT': 'IO' // Additional territories
};

// Continent mapping for countries (Alpha-3 codes)
export const continentMapping: Record<string, string> = {
  // North America
  'USA': 'North America', 'CAN': 'North America', 'MEX': 'North America',
  'GTM': 'North America', 'BLZ': 'North America', 'HND': 'North America',
  'SLV': 'North America', 'NIC': 'North America', 'CRI': 'North America',
  'PAN': 'North America', 'CUB': 'North America', 'JAM': 'North America',
  'HTI': 'North America', 'DOM': 'North America', 'PRI': 'North America',
  'BHS': 'North America', 'TTO': 'North America', 'BRB': 'North America',
  'GRD': 'North America', 'VCT': 'North America', 'LCA': 'North America',
  'DMA': 'North America', 'ATG': 'North America', 'KNA': 'North America',
  'BMU': 'North America', 'GRL': 'North America', 'CYM': 'North America',
  'TCA': 'North America', 'VGB': 'North America', 'VIR': 'North America',
  'MTQ': 'North America', 'GLP': 'North America', 'AIA': 'North America',
  'SPM': 'North America', 'MSR': 'North America', 'BLM': 'North America',
  'MAF': 'North America', 'SXM': 'North America', 'CUW': 'North America',
  'ABW': 'North America', 'BES': 'North America',

  // South America
  'COL': 'South America', 'VEN': 'South America', 'GUY': 'South America',
  'SUR': 'South America', 'BRA': 'South America', 'ECU': 'South America',
  'PER': 'South America', 'BOL': 'South America', 'CHL': 'South America',
  'ARG': 'South America', 'PRY': 'South America', 'URY': 'South America',
  'FLK': 'South America', 'GUF': 'South America',

  // Europe
  'GBR': 'Europe', 'FRA': 'Europe', 'DEU': 'Europe', 'ITA': 'Europe',
  'ESP': 'Europe', 'PRT': 'Europe', 'NLD': 'Europe', 'BEL': 'Europe',
  'CHE': 'Europe', 'AUT': 'Europe', 'POL': 'Europe', 'CZE': 'Europe',
  'SVK': 'Europe', 'HUN': 'Europe', 'ROU': 'Europe', 'BGR': 'Europe',
  'SRB': 'Europe', 'HRV': 'Europe', 'SVN': 'Europe', 'GRC': 'Europe',
  'TUR': 'Europe', 'NOR': 'Europe', 'SWE': 'Europe', 'FIN': 'Europe',
  'DNK': 'Europe', 'EST': 'Europe', 'LVA': 'Europe', 'LTU': 'Europe',
  'IRL': 'Europe', 'ISL': 'Europe', 'UKR': 'Europe', 'BLR': 'Europe',
  'RUS': 'Europe', 'MDA': 'Europe', 'MKD': 'Europe', 'ALB': 'Europe',
  'BIH': 'Europe', 'MNE': 'Europe', 'XKX': 'Europe', 'LUX': 'Europe',
  'MCO': 'Europe', 'VAT': 'Europe', 'LIE': 'Europe', 'SMR': 'Europe',
  'AND': 'Europe', 'MLT': 'Europe', 'CYP': 'Europe', 'FRO': 'Europe',
  'GIB': 'Europe', 'IMN': 'Europe', 'JEY': 'Europe', 'GGY': 'Europe',
  'ALA': 'Europe', 'SJM': 'Europe',

  // Asia
  'CHN': 'Asia', 'JPN': 'Asia', 'KOR': 'Asia', 'PRK': 'Asia',
  'IND': 'Asia', 'PAK': 'Asia', 'BGD': 'Asia', 'LKA': 'Asia',
  'NPL': 'Asia', 'BTN': 'Asia', 'MMR': 'Asia', 'THA': 'Asia',
  'LAO': 'Asia', 'VNM': 'Asia', 'KHM': 'Asia', 'MYS': 'Asia',
  'SGP': 'Asia', 'IDN': 'Asia', 'PHL': 'Asia', 'TLS': 'Asia',
  'BRN': 'Asia', 'TWN': 'Asia', 'HKG': 'Asia', 'MAC': 'Asia',
  'MNG': 'Asia', 'SAU': 'Asia', 'ARE': 'Asia', 'QAT': 'Asia',
  'KWT': 'Asia', 'BHR': 'Asia', 'OMN': 'Asia', 'YEM': 'Asia',
  'IRQ': 'Asia', 'IRN': 'Asia', 'ISR': 'Asia', 'JOR': 'Asia',
  'LBN': 'Asia', 'SYR': 'Asia', 'PSE': 'Asia', 'ARM': 'Asia',
  'AZE': 'Asia', 'GEO': 'Asia', 'KAZ': 'Asia', 'UZB': 'Asia',
  'TKM': 'Asia', 'TJK': 'Asia', 'KGZ': 'Asia', 'AFG': 'Asia',
  'MDV': 'Asia',

  // Africa
  'MAR': 'Africa', 'DZA': 'Africa', 'TUN': 'Africa', 'LBY': 'Africa',
  'EGY': 'Africa', 'SDN': 'Africa', 'SSD': 'Africa', 'MRT': 'Africa',
  'MLI': 'Africa', 'NER': 'Africa', 'TCD': 'Africa', 'ERI': 'Africa',
  'DJI': 'Africa', 'SOM': 'Africa', 'ETH': 'Africa', 'KEN': 'Africa',
  'UGA': 'Africa', 'RWA': 'Africa', 'BDI': 'Africa', 'TZA': 'Africa',
  'SEN': 'Africa', 'GMB': 'Africa', 'GNB': 'Africa', 'GIN': 'Africa',
  'SLE': 'Africa', 'LBR': 'Africa', 'CIV': 'Africa', 'GHA': 'Africa',
  'TGO': 'Africa', 'BEN': 'Africa', 'NGA': 'Africa', 'CMR': 'Africa',
  'CAF': 'Africa', 'GNQ': 'Africa', 'GAB': 'Africa', 'COG': 'Africa',
  'COD': 'Africa', 'AGO': 'Africa', 'ZMB': 'Africa', 'MWI': 'Africa',
  'MOZ': 'Africa', 'ZWE': 'Africa', 'BWA': 'Africa', 'NAM': 'Africa',
  'ZAF': 'Africa', 'LSO': 'Africa', 'SWZ': 'Africa', 'MDG': 'Africa',
  'MUS': 'Africa', 'COM': 'Africa', 'SYC': 'Africa', 'CPV': 'Africa',
  'STP': 'Africa', 'ESH': 'Africa', 'REU': 'Africa', 'MYT': 'Africa',
  'SHN': 'Africa', 'BFA': 'Africa',

  // Oceania
  'AUS': 'Oceania', 'NZL': 'Oceania', 'PNG': 'Oceania', 'SLB': 'Oceania',
  'VUT': 'Oceania', 'FJI': 'Oceania', 'TON': 'Oceania', 'WSM': 'Oceania',
  'KIR': 'Oceania', 'FSM': 'Oceania', 'MHL': 'Oceania', 'PLW': 'Oceania',
  'NRU': 'Oceania', 'TUV': 'Oceania', 'NCL': 'Oceania', 'PYF': 'Oceania',
  'COK': 'Oceania', 'NIU': 'Oceania', 'TKL': 'Oceania', 'GUM': 'Oceania',
  'ASM': 'Oceania', 'MNP': 'Oceania', 'WLF': 'Oceania', 'NFK': 'Oceania'
};

// Get country name from alpha-3 code
export const getCountryName = (alpha3Code: string): string => {
  return alpha3ToName[alpha3Code] || alpha3Code;
};

// Convert numeric code to alpha-3
export const convertNumericToAlpha3 = (numericCode: string): string => {
  return numericToAlpha3[numericCode] || numericCode;
};

// Convert alpha-3 to country name
export const getCountryNameFromNumeric = (numericCode: string): string => {
  const alpha3 = convertNumericToAlpha3(numericCode);
  return getCountryName(alpha3);
};

// Get country flag emoji from alpha-3 code
export const getCountryFlag = (alpha3Code: string): string => {
  if (!alpha3Code || alpha3Code.length !== 3) return '🏳️';

  const alpha2 = alpha3ToAlpha2[alpha3Code] || '';
  if (!alpha2) return '🏳️';

  try {
    // Convert alpha-2 country code to regional indicator symbols
    // Each regional indicator symbol letter is 127397 code points after its respective uppercase ASCII letter
    const codePoints = Array.from(alpha2).map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🏳️';
  }
};

// Get continent for a country based on alpha-3 code
export const getContinent = (alpha3Code: string): string => {
  return continentMapping[alpha3Code] || 'Other';
}; 