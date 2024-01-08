import {
  securityHashRegex,
  mousePatternRegex,
  gameDayRegex,
  ipRegex,
  serverNameRegex,
  citizenIdRegex,
  myCitizenshipRegex,
  sendFightRequestRegex,
  fightUrlRegex,
  citizenLevelRegex,
} from './constants';
import { formatNumber } from './general';

const extractValuesFromFunction = (functionString: string) => {
  const citizenId = functionString.match(citizenIdRegex)?.[1];
  const fightUrl = functionString.match(fightUrlRegex)?.[1];
  const gameDay = functionString.match(gameDayRegex)?.[1];
  const ip = functionString.match(ipRegex)?.[1];
  const mousePattern = functionString.match(mousePatternRegex)?.[1];
  const myCitizenship = functionString.match(myCitizenshipRegex)?.[1];
  const securityHash = functionString.match(securityHashRegex)?.[1];
  const serverName = functionString.match(serverNameRegex)?.[1];
  const citizenLevel = functionString.match(citizenLevelRegex)?.[1];

  const selectedWeaponQuality = document.getElementById('selectedWeapon')?.dataset.quality;

  return { citizenId, citizenLevel, fightUrl, gameDay, ip, mousePattern, myCitizenship, securityHash, selectedWeaponQuality, serverName };
};

export const getFightRequestProps = () => {
  const scriptElements = document.querySelectorAll('script');

  const validScripts: string[] = [];

  scriptElements.forEach((script, index) => {
    const match = script.textContent?.match(sendFightRequestRegex);

    if (match?.[0]) validScripts.push(match[0]);
  });

  if (validScripts.length === 0) return 'No valid scripts found.';

  return extractValuesFromFunction(validScripts[0]);
};

export const sendCustomFightRequest = (side: string, val: string) => {
  const actualBattleRoundId = document.querySelector('#battleRoundId') as HTMLInputElement;

  const fightRequestProps = getFightRequestProps();

  if (typeof fightRequestProps === 'string') return console.log('invalid fightRequestProps', fightRequestProps);

  console.log('fightRequestProps', fightRequestProps);

  const { citizenId, fightUrl, gameDay, ip, mousePattern, myCitizenship, securityHash, selectedWeaponQuality, serverName, citizenLevel } = fightRequestProps;

  if (!citizenId || !fightUrl || !gameDay || !ip || !myCitizenship || !securityHash || !selectedWeaponQuality || !serverName)
    return console.error('Missing one or more values.', { citizenId, fightUrl, gameDay, ip, mousePattern, myCitizenship, securityHash, selectedWeaponQuality, serverName });

  const data: Record<string, string> = {
    weaponQuality: selectedWeaponQuality,
    battleRoundId: actualBattleRoundId.value,
    side,
    value: val,
    ip,
    serverName,
    citizenId,
    myCitizenship,
    securityHash,
    gameDay,
  };

  if (mousePattern && mousePattern.length > 0) data['mousePattern'] = mousePattern;

  if (citizenLevel && citizenLevel.length > 0) data['citizenLevel'] = citizenLevel;

  console.log({ data });
  console.log('fightUrl', fightUrl);
  console.log('new URLSearchParams(data)', new URLSearchParams(data));

  fetch(fightUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data),
  })
    .then((response) => response.text())
    .then((msg) => {
      console.log('Success:', { msg });

      const fightResponseDiv = document.querySelector('#fightResponse > div') as HTMLDivElement | null;
      let selectedFood = document.getElementById('selectedFood');

      if (fightResponseDiv) {
        fightResponseDiv.innerHTML = msg;

        var healthText = (document.querySelector('#healthUpdate') as HTMLDivElement)?.textContent;
        if (healthText !== '' && healthText != null) {
          var healthUpdated = healthText.substr(0, healthText.length - 3);
          if (selectedFood) {
            if (Number(healthUpdated) === 0) {
              selectedFood.classList.add('focusOnElement');
            } else {
              selectedFood.classList.remove('focusOnElement');
            }
          }

          if (Number(healthUpdated) < 100) {
            const healthProgressDiv = document.querySelector('#healthProgress div.ui-corner-right') as HTMLDivElement | null;
            if (healthProgressDiv) {
              healthProgressDiv.classList.remove('ui-corner-right');
            }

            const healthProgressBarDiv = document.querySelector('#healthProgressBar div.ui-corner-right') as HTMLDivElement | null;
            if (healthProgressBarDiv) {
              healthProgressBarDiv.classList.remove('ui-corner-right');
            }
          }

          const healthProgress = document.querySelector('#healthProgress .ui-progressbar-value') as HTMLDivElement | null;
          const healthProgressBar = document.querySelector('#healthProgressBar .ui-progressbar-value') as HTMLDivElement | null;
          if (healthProgress && healthProgressBar) {
            healthProgress.style.width = healthUpdated + '%';
            healthProgressBar.style.width = healthUpdated + '%';
          }

          const actualHealth = document.getElementById('actualHealth');
          const actualHP = document.getElementById('actualHP');
          if (actualHealth && actualHP) {
            actualHealth.innerHTML = healthUpdated;
            actualHP.innerHTML = healthUpdated;
          }
        }

        var rank = parseInt(document.getElementById('rankUpdate')?.textContent || '');
        var rankNext = parseInt(document.getElementById('nextLevelRankUpdate')?.textContent || '');
        var rankCurr = parseInt(document.getElementById('currLevelRankUpdate')?.textContent || '');

        if (!isNaN(rank) && rank != null) {
          var rankWidth = Math.round(((rank - rankCurr) / (rankNext - rankCurr)) * 100);
          const rankProgress = document.querySelector('#rankProgress .ui-progressbar-value') as HTMLDivElement | null;
          const rankProgressBar = document.querySelector('#rankProgressBar .ui-progressbar-value') as HTMLDivElement | null;
          const actualRank = document.getElementById('actualRank');
          const actualRanks = document.getElementById('actualRanks');

          if (rankProgress && rankProgressBar && actualRank && actualRanks) {
            rankProgress.style.width = rankWidth + '%';
            rankProgressBar.style.width = rankWidth + '%';
            rankProgress.title = rank + ' / ' + rankNext;
            rankProgressBar.title = rank + ' / ' + rankNext;
            actualRank.innerHTML = formatNumber(rank).toString();
            actualRanks.innerHTML = formatNumber(rank).toString();
          }
        }

        var xp = parseInt(document.getElementById('xpUpdate')?.textContent || '');
        var xpNext = parseInt(document.getElementById('nextLevelXpUpdate')?.textContent || '');
        var xpCurr = parseInt(document.getElementById('currLevelXpUpdate')?.textContent || '');

        if (!isNaN(xp) && xp != null) {
          var xpWidth = Math.round(((xp - xpCurr) / (xpNext - xpCurr)) * 100);
          const xpProgress = document.querySelector('#xpProgress .ui-progressbar-value') as HTMLDivElement | null;
          const xpProgressBar = document.querySelector('#xpProgressBar .ui-progressbar-value') as HTMLDivElement | null;
          const actualXp = document.getElementById('actualXp');
          const actualExperience = document.getElementById('actualExperience');

          if (xpProgress && xpProgressBar && actualXp && actualExperience) {
            xpProgress.style.width = xpWidth + '%';
            xpProgressBar.style.width = xpWidth + '%';
            xpProgress.title = formatNumber(xp) + ' / ' + formatNumber(xpNext);
            xpProgressBar.title = formatNumber(xp) + ' / ' + formatNumber(xpNext);
            actualXp.innerHTML = formatNumber(xp).toString();
            actualExperience.innerHTML = formatNumber(xp).toString();
          }
        }

        var text = document.getElementById('fightStatus')?.innerHTML;
        const testBattle = document.getElementById('testBattle');
        if (testBattle) {
          testBattle.innerHTML = text || '';
        }

        // TODO REFACTOR\/\/\/
        const q1wep = document.getElementById('refreshedQ1weapon');
        const q2wep = document.getElementById('refreshedQ2weapon');
        const q3wep = document.getElementById('refreshedQ3weapon');
        const q4wep = document.getElementById('refreshedQ4weapon');
        const q5wep = document.getElementById('refreshedQ5weapon');
        const selectedWeapon = document.getElementById('selectedWeapon');
        const selectablesWeapons = document.getElementById('weaponSelectable');

        if (selectedWeapon && selectablesWeapons) {
          const weaponQ1Selected = selectedWeapon.querySelector('#weaponQ1') as HTMLElement;
          const weaponQ2Selected = selectedWeapon.querySelector('#weaponQ2') as HTMLElement;
          const weaponQ3Selected = selectedWeapon.querySelector('#weaponQ3') as HTMLElement;
          const weaponQ4Selected = selectedWeapon.querySelector('#weaponQ4') as HTMLElement;
          const weaponQ5Selected = selectedWeapon.querySelector('#weaponQ5') as HTMLElement;

          const weaponQ1Selectable = selectablesWeapons.querySelector('#weaponQ1') as HTMLElement;
          const weaponQ2Selectable = selectablesWeapons.querySelector('#weaponQ2') as HTMLElement;
          const weaponQ3Selectable = selectablesWeapons.querySelector('#weaponQ3') as HTMLElement;
          const weaponQ4Selectable = selectablesWeapons.querySelector('#weaponQ4') as HTMLElement;
          const weaponQ5Selectable = selectablesWeapons.querySelector('#weaponQ5') as HTMLElement;

          if (
            weaponQ1Selected &&
            weaponQ2Selected &&
            weaponQ3Selected &&
            weaponQ4Selected &&
            weaponQ5Selected &&
            weaponQ1Selectable &&
            weaponQ2Selectable &&
            weaponQ3Selectable &&
            weaponQ4Selectable &&
            weaponQ5Selectable &&
            q1wep &&
            q2wep &&
            q3wep &&
            q4wep &&
            q5wep
          ) {
            weaponQ1Selected.innerHTML = q1wep.innerHTML || '';
            weaponQ2Selected.innerHTML = q2wep.innerHTML || '';
            weaponQ3Selected.innerHTML = q3wep.innerHTML || '';
            weaponQ4Selected.innerHTML = q4wep.innerHTML || '';
            weaponQ5Selected.innerHTML = q5wep.innerHTML || '';

            weaponQ1Selectable.innerHTML = q1wep.innerHTML || '';
            weaponQ2Selectable.innerHTML = q2wep.innerHTML || '';
            weaponQ3Selectable.innerHTML = q3wep.innerHTML || '';
            weaponQ4Selectable.innerHTML = q4wep.innerHTML || '';
            weaponQ5Selectable.innerHTML = q5wep.innerHTML || '';
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
