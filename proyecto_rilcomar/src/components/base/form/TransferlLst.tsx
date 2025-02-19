import * as React from 'react';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { Pallet } from '../../../models/Pallet';

function not(a: readonly Pallet[], b: readonly Pallet[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly Pallet[], b: readonly Pallet[]) {
  return a.filter((value) => b.includes(value));
}

function union(a: readonly Pallet[], b: readonly Pallet[]) {
  return [...a, ...not(b, a)];
}

interface TransferListProps {
  left: Pallet[];
  setLeft: (value: Pallet[]) => void;
  right: Pallet[];
  setRight: (value: Pallet[]) => void;
  invalid?: boolean;
  helperText?: string;
}

export default function TransferList({ left, setLeft, right, setRight, invalid, helperText }: TransferListProps) {

  const [checked, setChecked] = useState<Pallet[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Pallet) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly Pallet[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly Pallet[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly Pallet[]) => (
    <Card variant='outlined'>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: Pallet) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Pallet ${value.id}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid item>{customList('Stock Pallets', left)}</Grid>
        <Grid item>
          <Grid container direction="column" sx={{ alignItems: 'center' }}>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Pallets Pedido', right)}</Grid>
      </Grid>
      {invalid &&
        <small id="username-help" style={{ color: 'red', marginTop: '1rem'}}>
          {helperText}
        </small>
      }
    </div>
  );
}
