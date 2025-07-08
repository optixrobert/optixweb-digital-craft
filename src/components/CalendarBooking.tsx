import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, User, Mail, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  company: string;
  date: Date | undefined;
  time: string;
  message: string;
  consultationType: string;
}

const CalendarBooking = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: undefined,
    time: "",
    message: "",
    consultationType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const consultationTypes = [
    { value: "web-development", label: "Sviluppo Sito Web" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "app-development", label: "Sviluppo Applicazioni" },
    { value: "seo-marketing", label: "SEO & Marketing" },
    { value: "ui-ux-design", label: "UX/UI Design" },
    { value: "maintenance", label: "Manutenzione & Supporto" },
    { value: "general", label: "Consulenza Generale" },
  ];

  const handleInputChange = (field: keyof BookingData, value: string | Date | undefined) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateCalendarEvent = () => {
    if (!bookingData.date || !bookingData.time) return null;

    const [hours, minutes] = bookingData.time.split(':');
    const startDateTime = new Date(bookingData.date);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 60); // 1 ora di durata

    const eventDetails = {
      title: `Consulenza ${consultationTypes.find(t => t.value === bookingData.consultationType)?.label || 'Generale'} - ${bookingData.name}`,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      description: `
Consulenza con ${bookingData.name}
Azienda: ${bookingData.company}
Email: ${bookingData.email}
Telefono: ${bookingData.phone}
Tipo: ${consultationTypes.find(t => t.value === bookingData.consultationType)?.label}

Note:
${bookingData.message}
      `.trim(),
      location: "Online - Link verrà inviato via email",
    };

    return eventDetails;
  };

  const createGoogleCalendarLink = () => {
    const event = generateCalendarEvent();
    if (!event) return "";

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: event.title,
      dates: `${event.start.replace(/[-:]/g, '').split('.')[0]}Z/${event.end.replace(/[-:]/g, '').split('.')[0]}Z`,
      details: event.description,
      location: event.location,
    });

    return `${baseUrl}&${params.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time || !bookingData.consultationType) {
      toast({
        title: "Campi mancanti",
        description: "Per favore compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Crea il link per Google Calendar
      const calendarLink = createGoogleCalendarLink();
      
      // Salva nel database
      const { error } = await supabase
        .from('consultation_requests')
        .insert([
          {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            company: bookingData.company,
            consultation_date: bookingData.date.toISOString(),
            consultation_time: bookingData.time,
            consultation_type: bookingData.consultationType,
            message: bookingData.message,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Richiesta inviata!",
        description: "La tua richiesta di consulenza è stata registrata. Ti contatteremo presto per confermare l'appuntamento.",
      });

      // Apri Google Calendar in una nuova finestra
      window.open(calendarLink, '_blank');

      // Reset form
      setBookingData({
        name: "",
        email: "",
        phone: "",
        company: "",
        date: undefined,
        time: "",
        message: "",
        consultationType: "",
      });

    } catch (error) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi o contattaci direttamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">
          Prenota una Consulenza Gratuita
        </CardTitle>
        <CardDescription className="text-lg">
          Fissiamo un appuntamento per discutere del tuo progetto digitale
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informazioni personali */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome e Cognome *
              </Label>
              <Input
                id="name"
                value={bookingData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Il tuo nome completo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="la.tua@email.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+39 123 456 7890"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Azienda</Label>
              <Input
                id="company"
                value={bookingData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Nome della tua azienda"
              />
            </div>
          </div>

          {/* Tipo di consulenza */}
          <div className="space-y-2">
            <Label htmlFor="consultationType">Tipo di Consulenza *</Label>
            <Select value={bookingData.consultationType} onValueChange={(value) => handleInputChange('consultationType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona il tipo di consulenza" />
              </SelectTrigger>
              <SelectContent>
                {consultationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data e ora */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Data *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !bookingData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingData.date ? format(bookingData.date, "PPP", { locale: it }) : "Seleziona una data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => handleInputChange('date', date)}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Orario *
              </Label>
              <Select value={bookingData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona un orario" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Messaggio */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Descrivi il tuo progetto
            </Label>
            <Textarea
              id="message"
              value={bookingData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Raccontaci del tuo progetto, obiettivi e quali sono le tue esigenze..."
              rows={4}
            />
          </div>

          {/* Submit button */}
          <Button 
            type="submit" 
            size="lg" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90"
          >
            {isLoading ? "Prenotando..." : "Prenota Consulenza Gratuita"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            * Campi obbligatori. La consulenza è gratuita e dura circa 60 minuti.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default CalendarBooking;