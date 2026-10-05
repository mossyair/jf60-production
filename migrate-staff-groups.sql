-- Staff sheet: the board gets its own group (org), and the placeholder roles are cleared
-- so the role field only holds real job titles. Run once after the Staff filter deploy.
UPDATE team SET org='Jerusalem Foundation board', role='' WHERE org='Jerusalem Foundation' AND role='Board of directors';
UPDATE team SET role='' WHERE org='Jerusalem Foundation' AND role='Staff';

-- Board titles (jerusalemfoundation.org, Jerusalem Foundation – Israel)
UPDATE team SET role='Chairman of the Board' WHERE org='Jerusalem Foundation board' AND name='Zvi Agmon';
UPDATE team SET role='General Assembly member' WHERE org='Jerusalem Foundation board' AND name='Alan Berkley';
