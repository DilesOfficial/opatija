import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Plane, MessageSquare, Eye, Trash2, Mail, Phone, MapPin, Calendar, Users, DollarSign } from 'lucide-react';

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  destination: string | null;
  num_travelers: number | null;
  travel_dates: string | null;
  budget: string | null;
  traveler_types: string[] | null;
  experience_types: string[] | null;
  additional_requests: string | null;
  status: string;
  created_at: string;
}

// Map translation keys to readable labels
const formatValue = (value: string): string => {
  const mappings: Record<string, string> = {
    // Traveler types
    'contact.traveler.solo': 'Solo Traveler',
    'contact.traveler.couple': 'Couple',
    'contact.traveler.family': 'Family with Kids',
    'contact.traveler.familyTeens': 'Family with Teens',
    'contact.traveler.multiGen': 'Multi-Generational',
    'contact.traveler.friends': 'Group of Friends',
    'contact.traveler.business': 'Business Travel',
    // Experience types
    'contact.exp.cultural': 'Cultural & Heritage',
    'contact.exp.adventure': 'Adventure',
    'contact.exp.wellness': 'Wellness & Spa',
    'contact.exp.culinary': 'Culinary',
    'contact.exp.wildlife': 'Wildlife & Safari',
    'contact.exp.beach': 'Beach & Relaxation',
    'contact.exp.city': 'City Exploration',
    'contact.exp.cruise': 'Cruise',
    'contact.exp.villa': 'Villa Stay',
    'contact.exp.tours': 'Guided Tours',
    // Destinations
    'contact.dest.italy': 'Italy',
    'contact.dest.greece': 'Greece',
    'contact.dest.france': 'France',
    'contact.dest.spain': 'Spain',
    'contact.dest.portugal': 'Portugal',
    'contact.dest.croatia': 'Croatia',
    'contact.dest.maldives': 'Maldives',
    'contact.dest.japan': 'Japan',
    'contact.dest.thailand': 'Thailand',
    'contact.dest.other': 'Other',
    // Budget
    'contact.budget.5k': '$5,000 - $10,000',
    'contact.budget.10k': '$10,000 - $25,000',
    'contact.budget.25k': '$25,000 - $50,000',
    'contact.budget.50k': '$50,000 - $100,000',
    'contact.budget.100k': '$100,000+',
    'contact.budget.flexible': 'Flexible',
  };
  return mappings[value] || value;
};

const AdminContacts = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactSubmission[];
    },
    enabled: isAdmin,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/flightadmin');
    }
  }, [authLoading, user, isAdmin, navigate]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({ title: 'Status updated' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({ title: 'Inquiry deleted' });
      setIsViewOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting inquiry', description: error.message, variant: 'destructive' });
    },
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/flightadmin');
  };

  const viewContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsViewOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'default',
      contacted: 'secondary',
      completed: 'outline',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
              <MessageSquare className="w-6 h-6 text-gold" />
              <h1 className="font-serif text-xl text-gold italic">Contact Inquiries</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/flightadmin/manage" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Flights
              </Link>
              <span className="text-sm text-gold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contacts
              </span>
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
          <h2 className="text-2xl font-semibold">Customer Inquiries</h2>
          <div className="text-sm text-muted-foreground">
            {contacts?.length || 0} total inquiries
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-secondary rounded-lg border border-gold/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.full_name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.destination || '-'}</TableCell>
                    <TableCell>{formatDate(contact.created_at)}</TableCell>
                    <TableCell>
                      <Select
                        value={contact.status}
                        onValueChange={(value) => updateStatusMutation.mutate({ id: contact.id, status: value })}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => viewContact(contact)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this inquiry?')) {
                              deleteMutation.mutate(contact.id);
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
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No inquiries yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* View Contact Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6 mt-4">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Full Name</div>
                  <div className="font-medium">{selectedContact.full_name}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  {getStatusBadge(selectedContact.status)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" /> Email
                  </div>
                  <a href={`mailto:${selectedContact.email}`} className="text-gold hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                {selectedContact.phone && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" /> Phone
                    </div>
                    <a href={`tel:${selectedContact.phone}`} className="text-gold hover:underline">
                      {selectedContact.phone}
                    </a>
                  </div>
                )}
                {selectedContact.country && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" /> Country
                    </div>
                    <div>{selectedContact.country}</div>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" /> Submitted
                  </div>
                  <div>{formatDate(selectedContact.created_at)}</div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="border-t border-gold/20 pt-4">
                <h4 className="font-semibold mb-4">Trip Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedContact.destination && (
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Destination</div>
                      <div>{formatValue(selectedContact.destination)}</div>
                    </div>
                  )}
                  {selectedContact.travel_dates && (
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Travel Dates</div>
                      <div>{selectedContact.travel_dates}</div>
                    </div>
                  )}
                  {selectedContact.num_travelers && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" /> Travelers
                      </div>
                      <div>{selectedContact.num_travelers}</div>
                    </div>
                  )}
                  {selectedContact.budget && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" /> Budget
                      </div>
                      <div>{formatValue(selectedContact.budget)}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Types */}
              {(selectedContact.traveler_types?.length || selectedContact.experience_types?.length) && (
                <div className="border-t border-gold/20 pt-4">
                  <h4 className="font-semibold mb-4">Preferences</h4>
                  <div className="space-y-3">
                    {selectedContact.traveler_types && selectedContact.traveler_types.length > 0 && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Traveler Types</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedContact.traveler_types.map((type) => (
                            <Badge key={type} variant="outline">{formatValue(type)}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedContact.experience_types && selectedContact.experience_types.length > 0 && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Experience Types</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedContact.experience_types.map((type) => (
                            <Badge key={type} variant="outline">{formatValue(type)}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Requests */}
              {selectedContact.additional_requests && (
                <div className="border-t border-gold/20 pt-4">
                  <h4 className="font-semibold mb-2">Additional Requests</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedContact.additional_requests}</p>
                </div>
              )}

              {/* Actions */}
              <div className="border-t border-gold/20 pt-4 flex gap-3">
                <Button variant="gold" asChild>
                  <a href={`mailto:${selectedContact.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                {selectedContact.phone && (
                  <Button variant="outline" asChild>
                    <a href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContacts;
