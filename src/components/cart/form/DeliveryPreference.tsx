import React, { useEffect } from 'react';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from './types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const timeSlots = [
  "8h - 12h",
  "12h - 14h",
  "14h - 18h",
  "18h - 20h"
];

interface DeliveryPreferenceProps {
  form: UseFormReturn<UserFormData>;
}

const DeliveryPreference = ({ form }: DeliveryPreferenceProps) => {
  // Add 2 days to current date to set a minimum delivery date
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  
  // Add 45 days to current date to set a maximum delivery date (changed from 30 days)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 45);

  // Effect to update the order note when delivery preferences change
  useEffect(() => {
    const deliveryDate = form.watch("preferredDeliveryDate");
    const timeSlot = form.watch("preferredDeliveryTimeSlot");
    
    // Only proceed if at least one preference is selected
    if (deliveryDate || timeSlot) {
      let deliveryPreferenceText = "Je préfère être livré";
      
      // Add formatted date if available
      if (deliveryDate) {
        const formattedDate = format(deliveryDate, "dd MMMM yyyy", { locale: fr });
        deliveryPreferenceText += ` le ${formattedDate}`;
      }
      
      // Add time slot if available
      if (timeSlot) {
        deliveryPreferenceText += ` entre ${timeSlot}`;
      }
      
      // Set the new note with the delivery preference
      form.setValue("orderNote", deliveryPreferenceText + "\n\n");
    }
  }, [form.watch("preferredDeliveryDate"), form.watch("preferredDeliveryTimeSlot")]);

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-[#700100]">Préférences de livraison (optionnel)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Indiquez vos préférences pour la date et l'heure de livraison
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="preferredDeliveryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-gray-700 font-medium">Date préférée</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd MMMM yyyy", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      // Close the popover by triggering a click on the trigger button
                      const triggerButton = document.querySelector('[data-state="open"]');
                      if (triggerButton) {
                        (triggerButton as HTMLButtonElement).click();
                      }
                    }}
                    disabled={(date) => 
                      date < minDate || date > maxDate
                    }
                    initialFocus
                    locale={fr}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="preferredDeliveryTimeSlot"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-gray-700 font-medium">Plage horaire préférée</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-2"
                >
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <RadioGroupItem value={slot} id={`time-${slot}`} />
                      <Label htmlFor={`time-${slot}`} className="flex items-center text-black font-normal">
                        <Clock className="h-4 w-4 mr-1 text-[#700100]" />
                        {slot}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DeliveryPreference;
