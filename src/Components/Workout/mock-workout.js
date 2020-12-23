import { storage, getFullDate } from '../../lib';
export default function () {
  storage.setItem(
    'workout',
    JSON.stringify({
      date: getFullDate(),
      intervals: [
        {
          name: 'Test beeps 1',
          detail: 'whole number',
          from: '00:01',
        },
        {
          name: 'Test beeps 2',
          detail: 'fraction of sec',
          from: '00:2.5',
        },
        {
          name: 'Warm-up',
          from: '00:04',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:10',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Sprint',
          detail: '90% HRmax',
          from: '00:30',
        },
        {
          name: 'Rest',
          from: '00:30',
        },
        {
          name: 'Cool-down',
          from: '00:10',
        },
      ],
    })
  );
}
