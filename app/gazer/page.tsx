'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Checkbox } from '~/components/ui/checkbox';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';

import { TeamSchemaType } from '../components/schemas';

export default function GazerPage() {
  const form = useForm();

  const [parsedData, setParsedData] = useState<TeamSchemaType | null>(null);
  const [defenders, setDefenders] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }
  }, []);

  const handleRaiderSelect = (value: string) => {
    form.setValue('raider', value);
    if (parsedData) {
      const team = parsedData.dog_players.some((player) => player.id === value)
        ? 'cat_players'
        : 'dog_players';
      setDefenders(parsedData[team].map((player) => player.playerName));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <FormField
          control={form.control}
          name="raider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. Who is the raider?</FormLabel>
              <FormControl>
                <Select onValueChange={handleRaiderSelect}>
                  <SelectTrigger className="w-[180px] dark:bg-black">
                    <SelectValue placeholder="Raider" />
                  </SelectTrigger>
                  <SelectContent>
                    {parsedData?.dog_players
                      .concat(parsedData.cat_players)
                      .map((player) => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.playerName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isRaidSuccessful"
          render={({ field }) => (
            <FormItem>
              <FormLabel>2. Was the raid successful?</FormLabel>
              <FormControl>
                <Switch id="isRaidSuccessful" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defenders"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                3. Who are the defeated defenders? (including lineouts)
              </FormLabel>
              <FormControl>
                <div className="grid gap-2">
                  {defenders.map((defender) => (
                    <div key={defender} className="flex items-center">
                      <Checkbox
                        onCheckedChange={(isChecked: boolean) =>
                          field.onChange(
                            isChecked
                              ? [...(field.value || []), defender]
                              : field.value.filter(
                                  (d: string) => d !== defender
                                )
                          )
                        }
                      />
                      <span className="ml-2">{defender}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hasBonusPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4. Were there the bonus points?</FormLabel>
              <FormControl>
                <Switch id="hasBonusPoints" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
