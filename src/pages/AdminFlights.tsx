import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, LogOut, Plane, MessageSquare } from 'lucide-react';

interface Flight {
  id: string;
  departure_city: string;
  departure_city_he: string | null;
  arrival_city: string;
  arrival_city_he: string | null;
  departure_date: string;
  departure_time: string | null;
  aircraft_type: string;
  aircraft_type_he: string | null;
  available_seats: number;
  price_from: string | null;
  notes: string | null;
  notes_he: string | null;
  is_active: boolean;
}

const emptyFlight: Omit<Flight, 'id'> = {
  departure_city: '',
  departure_city_he: '',
  arrival_city: '',
  arrival_city_he: '',
  departure_date: '',
  departure_time: '',
  aircraft_type: '',
  aircraft_type_he: '',
  available_seats: 1,
  price_from: '',
  notes: '',
  notes_he: '',
  is_active: true,
};

const AdminFlights = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [formData, setFormData] = useState<Omit<Flight, 'id'>>(emptyFlight);

  // All hooks must be called before any conditional returns
  const { data: flights, isLoading } = useQuery({
    queryKey: ['admin-flights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('available_flights')
        .select('*')
        .order('departure_date', { ascending: true });
      
      if (error) throw error;
      return data as Flight[];
    },
    enabled: isAdmin,
  });

  // Redirect if not admin - using useEffect to avoid hooks order issues
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/flightadmin');
    }
  }, [authLoading, user, isAdmin, navigate]);

  const createMutation = useMutation({
    mutationFn: async (flight: Omit<Flight, 'id'>) => {
      const { error } = await supabase.from('available_flights').insert([flight]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flights'] });
      queryClient.invalidateQueries({ queryKey: ['available-flights'] });
      toast({ title: 'Flight created successfully' });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating flight', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...flight }: Flight) => {
      const { error } = await supabase.from('available_flights').update(flight).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flights'] });
      queryClient.invalidateQueries({ queryKey: ['available-flights'] });
      toast({ title: 'Flight updated successfully' });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating flight', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('available_flights').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flights'] });
      queryClient.invalidateQueries({ queryKey: ['available-flights'] });
      toast({ title: 'Flight deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting flight', description: error.message, variant: 'destructive' });
    },
  });

  const openCreateDialog = () => {
    setEditingFlight(null);
    setFormData(emptyFlight);
    setIsDialogOpen(true);
  };

  const openEditDialog = (flight: Flight) => {
    setEditingFlight(flight);
    setFormData({
      departure_city: flight.departure_city,
      departure_city_he: flight.departure_city_he || '',
      arrival_city: flight.arrival_city,
      arrival_city_he: flight.arrival_city_he || '',
      departure_date: flight.departure_date,
      departure_time: flight.departure_time || '',
      aircraft_type: flight.aircraft_type,
      aircraft_type_he: flight.aircraft_type_he || '',
      available_seats: flight.available_seats,
      price_from: flight.price_from || '',
      notes: flight.notes || '',
      notes_he: flight.notes_he || '',
      is_active: flight.is_active,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingFlight(null);
    setFormData(emptyFlight);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const flightData = {
      ...formData,
      departure_city_he: formData.departure_city_he || null,
      arrival_city_he: formData.arrival_city_he || null,
      departure_time: formData.departure_time || null,
      aircraft_type_he: formData.aircraft_type_he || null,
      price_from: formData.price_from || null,
      notes: formData.notes || null,
      notes_he: formData.notes_he || null,
    };

    if (editingFlight) {
      updateMutation.mutate({ id: editingFlight.id, ...flightData });
    } else {
      createMutation.mutate(flightData);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/flightadmin');
  };

  // Show loading or redirect state
  if (authLoading || isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-gold/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Plane className="w-6 h-6 text-gold" />
              <h1 className="font-serif text-xl text-gold italic">Flight Management</h1>
            </div>
            <nav className="flex items-center gap-4">
              <span className="text-sm text-gold flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Flights
              </span>
              <Link to="/flightadmin/contacts" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contacts
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Available Flights</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gold" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Flight
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingFlight ? 'Edit Flight' : 'Add New Flight'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {/* Route */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Departure City (EN) *</Label>
                    <Input
                      value={formData.departure_city}
                      onChange={(e) => setFormData({ ...formData, departure_city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Departure City (HE)</Label>
                    <Input
                      value={formData.departure_city_he || ''}
                      onChange={(e) => setFormData({ ...formData, departure_city_he: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Arrival City (EN) *</Label>
                    <Input
                      value={formData.arrival_city}
                      onChange={(e) => setFormData({ ...formData, arrival_city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Arrival City (HE)</Label>
                    <Input
                      value={formData.arrival_city_he || ''}
                      onChange={(e) => setFormData({ ...formData, arrival_city_he: e.target.value })}
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Departure Date *</Label>
                    <Input
                      type="date"
                      value={formData.departure_date}
                      onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Departure Time</Label>
                    <Input
                      type="time"
                      value={formData.departure_time || ''}
                      onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
                    />
                  </div>
                </div>

                {/* Aircraft */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Aircraft Type (EN) *</Label>
                    <Input
                      value={formData.aircraft_type}
                      onChange={(e) => setFormData({ ...formData, aircraft_type: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Aircraft Type (HE)</Label>
                    <Input
                      value={formData.aircraft_type_he || ''}
                      onChange={(e) => setFormData({ ...formData, aircraft_type_he: e.target.value })}
                    />
                  </div>
                </div>

                {/* Seats & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Available Seats *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.available_seats}
                      onChange={(e) => setFormData({ ...formData, available_seats: parseInt(e.target.value) || 1 })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price From</Label>
                    <Input
                      value={formData.price_from || ''}
                      onChange={(e) => setFormData({ ...formData, price_from: e.target.value })}
                      placeholder="e.g., $15,000"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Notes (EN)</Label>
                    <Textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes (HE)</Label>
                    <Textarea
                      value={formData.notes_he || ''}
                      onChange={(e) => setFormData({ ...formData, notes_he: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active (visible to public)</Label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingFlight ? 'Update Flight' : 'Create Flight'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Flights Table */}
        <div className="bg-secondary rounded-lg border border-gold/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Aircraft</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights && flights.length > 0 ? (
                flights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell className="font-medium">
                      {flight.departure_city} → {flight.arrival_city}
                    </TableCell>
                    <TableCell>
                      {new Date(flight.departure_date).toLocaleDateString()}
                      {flight.departure_time && ` ${flight.departure_time.slice(0, 5)}`}
                    </TableCell>
                    <TableCell>{flight.aircraft_type}</TableCell>
                    <TableCell>{flight.available_seats}</TableCell>
                    <TableCell>{flight.price_from || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        flight.is_active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {flight.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(flight)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this flight?')) {
                              deleteMutation.mutate(flight.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No flights found. Add your first flight!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminFlights;
