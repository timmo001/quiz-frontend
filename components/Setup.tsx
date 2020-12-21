import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Link from "next/link";
import React, { Fragment, ReactElement, useEffect, useState } from "react";

import { getCategories } from "../lib/api";
import { Category } from "../types/OpenTriviaDB";
import Loading from "./Loading";
import { QuestionsProps } from "./Questions/Questions";

export interface SetupProps {}

interface Configuration extends QuestionsProps {}

interface AutocompleteOption {
  label: string;
  value: string;
}

const difficulties: AutocompleteOption[] = [
  { label: "Any", value: "" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const types: AutocompleteOption[] = [
  { label: "Any", value: "" },
  { label: "Multiple Choice", value: "multiple" },
  { label: "True / False", value: "boolean" },
];

function Setup(props: SetupProps): ReactElement {
  const [categories, setCategories] = useState<Category[]>();
  const [configuration, setConfiguration] = useState<Configuration>({
    amount: 10,
  });

  const { amount, category, difficulty, type } = configuration;

  async function fetchCategories(): Promise<void> {
    setCategories(await getCategories());
  }

  const handleTextFieldChange = (prop: keyof Configuration) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfiguration({ ...configuration, [prop]: event.target.value });
  };

  useEffect(() => {
    if (!categories) fetchCategories();
  }, [categories, getCategories]);

  return (
    <Fragment>
      {!categories ? (
        <Loading text="Loading.." />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Title
            </Typography>
            <TextField
              fullWidth
              inputProps={{ max: 50 }}
              label="Amount"
              margin="normal"
              onChange={handleTextFieldChange("amount")}
              required
              type="number"
              value={amount}
              variant="outlined"
            />
            <Autocomplete
              autoHighlight
              clearOnEscape
              fullWidth
              getOptionLabel={(option) => option.name}
              openOnFocus
              options={categories}
              onChange={(_event: any, newValue: Category) => {
                console.log(newValue);
                setConfiguration({ ...configuration, category: newValue.id });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  variant="outlined"
                  label="Category"
                />
              )}
              value={category}
            />
            <Autocomplete
              autoHighlight
              clearOnEscape
              fullWidth
              getOptionLabel={(option) => option.label}
              openOnFocus
              options={difficulties}
              onChange={(_event: any, newValue: AutocompleteOption) => {
                console.log(newValue);
                setConfiguration({
                  ...configuration,
                  difficulty: newValue.value,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  variant="outlined"
                  label="Difficulty"
                />
              )}
              value={difficulty}
            />
            <Autocomplete
              autoHighlight
              clearOnEscape
              fullWidth
              getOptionLabel={(option) => option.label}
              openOnFocus
              options={types}
              onChange={(_event: any, newValue: AutocompleteOption) => {
                console.log(newValue);
                setConfiguration({ ...configuration, type: newValue.value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  variant="outlined"
                  label="Type"
                />
              )}
              value={type}
            />
            <Link
              href={{
                pathname: "/play",
                query: { amount, category, difficulty, type },
              }}>
              <Button color="primary" fullWidth variant="contained">
                Play
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
}

export default Setup;
