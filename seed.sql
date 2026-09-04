-- Seeded example reports. Timestamps are relative to now so the live feed
-- always looks current during a demo. Re-run any time to refresh.
-- Covers all 8 routes in src/data/routes.json with a realistic spread of
-- statuses, plates, notes and reporters. Most reports are inside the 2-hour
-- freshness window; a few older ones give the feed some history.
DELETE FROM reports WHERE id LIKE 'seed_%';

INSERT INTO reports (id, route_number, status, bus_reg, note, reporter, flags, created_at) VALUES
 -- 138 Maharagama - Pettah : busy corridor, mostly delayed
 ('seed_01','138','delayed','NC-3421','Stuck near Nugegoda junction, big traffic',      'Kasun',    0, (unixepoch()-300)*1000),
 ('seed_02','138','delayed',NULL,      'Two buses passed full without stopping at Kirulapone','Nimali',0,(unixepoch()-1500)*1000),
 ('seed_03','138','crowded','NB-9902', 'Packed but moving past Navinna',                'Ruwan',    0, (unixepoch()-3300)*1000),
 ('seed_04','138','delayed','NA-7742', 'Slow crawl from Town Hall to Pettah',           NULL,       0, (unixepoch()-2100)*1000),
 ('seed_05','138','normal', 'NC-3421', 'Moving again past Town Hall',                   'Kasun',    0, (unixepoch()-120)*1000),
 ('seed_06','138','crowded',NULL,      'Standing only from Maharagama, school time',    'Tharaka',  0, (unixepoch()-5400)*1000),

 -- 120 Piliyandala - Pettah : running well
 ('seed_07','120','normal', NULL,      'On time at Delkanda',                           NULL,       0, (unixepoch()-900)*1000),
 ('seed_08','120','normal', 'NA-1123', 'Just left Piliyandala, seats available',        'Dilani',   0, (unixepoch()-2600)*1000),
 ('seed_09','120','crowded','NB-2255', 'Filled up by Nugegoda',                         'Amila',    0, (unixepoch()-4200)*1000),
 ('seed_10','120','normal', NULL,      'Smooth run through Kirulapone',                 'Fathima',  0, (unixepoch()-6600)*1000),

 -- 177 Kaduwela - Pettah : service disruption (used in the demo)
 ('seed_11','177','not_running',NULL,   'Nothing at Battaramulla for 30 min',           'Sanjaya',  0, (unixepoch()-600)*1000),
 ('seed_12','177','not_running','NC-7781','Driver said last trip cancelled',            NULL,       0, (unixepoch()-2400)*1000),
 ('seed_13','177','not_running',NULL,   'Waiting at Rajagiriya, none since 5pm',         'Hashini',  0, (unixepoch()-1200)*1000),
 ('seed_14','177','delayed','ND-4410',  'One came after long wait, very slow at Borella','Pradeep', 0, (unixepoch()-3600)*1000),

 -- 100 Panadura - Colombo Fort : Galle Road crush
 ('seed_15','100','crowded',NULL,       'Standing room only from Moratuwa',             'Ishara',   0, (unixepoch()-800)*1000),
 ('seed_16','100','crowded','NB-4550',  'Very full at Wellawatte, could not board',     NULL,       0, (unixepoch()-1900)*1000),
 ('seed_17','100','delayed','NA-8821',  'Galle Road jam near Dehiwala',                 'Kavinda',  0, (unixepoch()-3000)*1000),
 ('seed_18','100','normal', 'NB-4550',  'Cleared up after Kollupitiya',                 NULL,       0, (unixepoch()-360)*1000),
 ('seed_19','100','normal', NULL,       'Smooth run along Galle Road early morning',    'Nadeesha', 0, (unixepoch()-9000)*1000),

 -- 101 Moratuwa - Pettah : normal with a rush-hour spike
 ('seed_20','101','normal', NULL,       'Regular service at Wellawatte',                'Tharindu', 0, (unixepoch()-1700)*1000),
 ('seed_21','101','crowded','NC-1290',  'Packed from Ratmalana onwards',                'Sachini',  0, (unixepoch()-2800)*1000),
 ('seed_22','101','normal', 'NB-3377',  'Left Moratuwa on time',                        NULL,       0, (unixepoch()-700)*1000),
 ('seed_23','101','delayed',NULL,       'Held near Bambalapitiya, minor accident',      'Ravindu',  0, (unixepoch()-4800)*1000),

 -- 154 Kirulapone - Kadawatha : road work delays
 ('seed_24','154','delayed','NC-2093',  'Slow near Borella, road work',                 NULL,       0, (unixepoch()-1000)*1000),
 ('seed_25','154','delayed',NULL,       'Long queue of buses at Peliyagoda bridge',     'Menuka',   0, (unixepoch()-2500)*1000),
 ('seed_26','154','normal', 'NA-6614',  'Fine once past Kelaniya',                      'Buddhika', 0, (unixepoch()-5200)*1000),
 ('seed_27','154','crowded',NULL,       'Full by Maradana',                             NULL,       0, (unixepoch()-6800)*1000),

 -- 187 Moratuwa - Kadawatha : long route, fills up
 ('seed_28','187','crowded',NULL,       'Full by Kottawa',                              'Menaka',   0, (unixepoch()-3000)*1000),
 ('seed_29','187','crowded','NB-7788',  'No space from Malabe, many left behind',       NULL,       0, (unixepoch()-1400)*1000),
 ('seed_30','187','normal', 'NC-5501',  'Left Moratuwa with seats',                     'Isuru',    0, (unixepoch()-500)*1000),
 ('seed_31','187','delayed',NULL,       'Traffic at Kaduwela town',                     'Dinithi',  0, (unixepoch()-4500)*1000),

 -- 1 Colombo - Kandy : intercity, mixed
 ('seed_32','1',  'normal',  'ND-1201', 'Left Pettah on time, expressway clear',        'Roshan',   0, (unixepoch()-2000)*1000),
 ('seed_33','1',  'delayed', NULL,      'Held up at Kadugannawa, long line of vehicles','Nuwan',    0, (unixepoch()-3900)*1000),
 ('seed_34','1',  'normal',  'ND-9932', 'Good run up to Kegalle',                       NULL,       0, (unixepoch()-1100)*1000),
 ('seed_35','1',  'crowded', 'ND-1201', 'Every seat taken from Warakapola',             'Roshan',   0, (unixepoch()-6000)*1000);
